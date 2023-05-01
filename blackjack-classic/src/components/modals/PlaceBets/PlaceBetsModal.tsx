import React, { useCallback } from 'react';
import styles from './placebets.styles.module.css';
import {
    addBalance,
    clearBets,
    hitCard,
    hitCardDealer,
    reduceBalance,
    resetState,
    restoreBets,
    startGame,
    useAppDispatch,
} from '../../../store';
import { ReactComponent as Undo } from '../../../assets/undo.svg';
import { ReactComponent as Redo } from '../../../assets/redo.svg';
import { Modal, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../constants';
import { Portal } from '../Portal';
import { ChipButton, RoundButton } from '../../buttons';
import { Props } from './placebets.types';

export const PlaceBetsModal = ({ open, setOpen, balance, player, seats }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { bets, lastBet } = player;

    const totalBet = bets.reduce((acc, bet) => acc + seats[bet].amount, 0);

    const handleUndoBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        dispatch(clearBets());
    }, [totalBet, dispatch]);

    const handleRestoreBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        if (lastBet * bets.length <= balance + totalBet) {
            dispatch(reduceBalance(lastBet * bets.length));
            dispatch(restoreBets());
        }
    }, [dispatch, totalBet, player, balance]);

    const handleClose = useCallback(() => {
        if (!bets.length || seats[bets[0]].amount < 5) {
            dispatch(addBalance(totalBet));
            dispatch(resetState());
            Modal.success({
                title: 'Thanks for the game! Come back again!',
                onOk: () => {
                    navigate(ROUTES.LOBBY);
                },
            });
        } else {
            setOpen(false);
            dispatch(startGame());
            for (let i = 0; i < 2; i++) {
                bets.forEach((id) => {
                    dispatch(hitCard(id));
                });
                dispatch(hitCardDealer());
            }
        }
    }, [seats, totalBet, bets, dispatch]);

    return (
        <Portal open={open}>
            <div className={styles.content}>
                <RoundButton onClick={handleUndoBets} isAvailable={!!bets.length}>
                    <Tooltip title="UNDO">
                        <Undo />
                    </Tooltip>
                </RoundButton>
                {[1, 5, 10, 25, 100].map((value) => (
                    <ChipButton value={value} key={value} balance={balance} bets={bets} />
                ))}
                <RoundButton
                    onClick={handleRestoreBets}
                    isAvailable={!!bets.length && lastBet * bets.length <= balance + totalBet}
                >
                    <Tooltip title="REPEAT">
                        <Redo />
                    </Tooltip>
                </RoundButton>
            </div>
            <RoundButton onClick={handleClose}>accept</RoundButton>
        </Portal>
    );
};
