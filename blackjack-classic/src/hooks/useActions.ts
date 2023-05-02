import { useCallback, useEffect, useState } from 'react';
import {
    SeatState,
    doubleBet,
    hitCard,
    reduceBalance,
    splitPair,
    stand,
    useAppDispatch,
} from '../store';

type Props = {
    seat: SeatState;
    balance: number;
    playingSeat: number | null;
};

export const useActions = ({ seat, balance, playingSeat }: Props) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { cards, score, id, amount, splittedID } = seat;

    const canSplit =
        cards.length === 2 &&
        !('splittedID' in seat || 'originID' in seat) &&
        cards[0].rank === cards[1].rank &&
        balance >= amount;

    const canDoubleDown = balance >= amount && cards.length === 2;

    const onHitCard = useCallback(() => {
        setIsOpen(false);
        dispatch(hitCard(id));
    }, []);

    const onStand = useCallback(() => {
        setIsOpen(false);
        dispatch(stand());
    }, []);

    const onDoubleDown = useCallback(() => {
        if (canDoubleDown) {
            setIsOpen(false);
            dispatch(reduceBalance(amount));
            dispatch(doubleBet());
            dispatch(hitCard(id));
            dispatch(stand());
        }
    }, [amount, canDoubleDown]);

    const onSplit = useCallback(() => {
        if (canSplit) {
            setIsOpen(false);
            dispatch(reduceBalance(amount));
            dispatch(splitPair(id));
            dispatch(hitCard(id));
        }
    }, [canSplit, amount]);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (playingSeat === id) {
            if (score >= 21) {
                setIsOpen(false);
                dispatch(stand());
            } else {
                timeout = setTimeout(() => {
                    setIsOpen(true);
                }, 250);
            }
        } else {
            if (isOpen) {
                setIsOpen(false);
            }
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [score, playingSeat, cards, isOpen]);

    useEffect(() => {
        if ('splittedID' in seat) {
            dispatch(hitCard(splittedID!));
        }
    }, [splittedID]);

    return { isOpen, canSplit, canDoubleDown, onHitCard, onStand, onSplit, onDoubleDown };
};
