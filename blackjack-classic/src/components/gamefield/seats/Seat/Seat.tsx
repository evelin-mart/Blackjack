import React, { useCallback, useEffect, useState } from 'react';
import {
    SeatState,
    doubleBet,
    hitCard,
    reduceBalance,
    splitPair,
    stand,
    useAppDispatch,
} from '../../../../store';
import styles from '../seats.styles.module.css';
import { Tag } from 'antd';
import { ActionsModal } from '../../../modals/Actions';
import classNames from 'classnames';

type Props = {
    seat: SeatState;
    balance: number;
    playingSeat: number | null;
};

const Colors = {
    Win: 'success',
    Lose: 'loose',
    Push: 'push',
    Bust: 'loose',
    BJ: 'success',
};

export const Seat = ({ seat, balance, playingSeat }: Props) => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cards, status, score, id, amount, splittedID } = seat;

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (score >= 21 && playingSeat === id) {
            setIsModalOpen(false);
            dispatch(stand());
        }
        if (playingSeat === id && score < 21) {
            setTimeout(() => {
                setIsModalOpen(true);
            }, 250);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [score, playingSeat, cards]);

    const isSplittable =
        cards.length === 2 &&
        !('splittedID' in seat || 'originID' in seat) &&
        cards[0].rank === cards[1].rank &&
        balance >= amount;

    const canDoubleDown = balance >= amount && cards.length === 2;

    const onHitCard = useCallback(() => {
        setIsModalOpen(false);
        dispatch(hitCard(id));
    }, []);

    const onStand = useCallback(() => {
        setIsModalOpen(false);
        dispatch(stand());
    }, []);

    const onDoubleDown = useCallback(() => {
        if (canDoubleDown) {
            setIsModalOpen(false);
            dispatch(reduceBalance(amount));
            dispatch(doubleBet());
            dispatch(hitCard(id));
            dispatch(stand());
        }
    }, [amount, canDoubleDown]);

    const onSplit = useCallback(() => {
        if (isSplittable) {
            setIsModalOpen(false);
            dispatch(reduceBalance(amount));
            dispatch(splitPair(id));
            dispatch(hitCard(id));
        }
    }, [isSplittable, amount]);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if ('splittedID' in seat) {
            timeout = setTimeout(() => {
                dispatch(hitCard(splittedID!));
            }, 250);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [splittedID]);

    const style = classNames(styles.wrapper, { [styles.active]: playingSeat === id });

    return (
        <>
            <ActionsModal
                isOpen={isModalOpen}
                canDoubleDown={canDoubleDown}
                isSplittable={isSplittable}
                onDoubleDown={onDoubleDown}
                onHitCard={onHitCard}
                onSplit={onSplit}
                onStand={onStand}
            />
            <div className={style}>
                {cards.map((card, i) => (
                    <img
                        src={`./assets/${card.suit}/${card.rank}.png`}
                        key={i}
                        className={styles.card}
                        style={{ transform: `translate(${i * 18}px, -${i * 18}px)` }}
                    />
                ))}
                {score > 0 && (
                    <Tag className={styles.score} color="black">
                        {score}
                    </Tag>
                )}
                {status && (
                    <div className={styles.status}>
                        <div className={classNames(styles.icon, styles[Colors[status]])} />
                        <Tag color="black">{status}</Tag>
                    </div>
                )}
            </div>
        </>
    );
};
