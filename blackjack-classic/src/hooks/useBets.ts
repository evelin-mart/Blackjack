import { useNavigate } from 'react-router';
import {
    GameStatus,
    Player,
    SeatState,
    addBalance,
    clearBets,
    hitCard,
    hitCardDealer,
    reduceBalance,
    reset,
    restoreBets,
    startGame,
    useAppDispatch,
} from '../store';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { ROUTES } from '../constants';

export type Props = {
    balance: number;
    seats: {
        [x: number]: SeatState;
    };
    player: Player;
    status: GameStatus;
};

export const useBets = ({ balance, player, seats, status }: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { bets, lastBet } = player;

    const totalBet = bets.reduce((acc, bet) => acc + seats[bet].amount, 0);

    const isRedoAvailable = !!bets.length && lastBet * bets.length <= balance + totalBet;

    const handleUndoBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        dispatch(clearBets());
    }, [totalBet, dispatch]);

    const handleRestoreBets = useCallback(() => {
        const diff = totalBet - lastBet * bets.length;
        if (diff > 0) {
            dispatch(addBalance(diff));
        } else {
            dispatch(reduceBalance(-diff));
        }
        dispatch(restoreBets());
    }, [dispatch, totalBet, player]);

    const handleAcceptBets = useCallback(() => {
        if (!bets.length || seats[bets[0]].amount < 5) {
            dispatch(addBalance(totalBet));
            dispatch(reset());
            Modal.success({
                title: 'Thanks for the game! Come back again!',
                onOk: () => {
                    navigate(ROUTES.LOBBY);
                },
            });
        } else {
            setIsOpen(false);
            dispatch(startGame());
            for (let i = 0; i < 2; i++) {
                bets.forEach((id) => {
                    dispatch(hitCard(id));
                });
                dispatch(hitCardDealer());
            }
        }
    }, [seats, totalBet, bets, dispatch]);

    useEffect(() => {
        if (status === GameStatus.BETS) {
            if (balance > 5) {
                setIsOpen(true);
            } else {
                Modal.success({
                    title: 'Thanks for the game! Come back again!',
                    content: 'Not enough money to continue playing. Please, top up your balance',
                    onOk: () => {
                        dispatch(reset());
                        navigate(ROUTES.LOBBY);
                    },
                });
            }
        }
    }, [status]);

    return { isOpen, isRedoAvailable, handleAcceptBets, handleRestoreBets, handleUndoBets };
};
