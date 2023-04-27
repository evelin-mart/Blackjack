import React, { useCallback } from 'react';
import styles from './placebets.styles.module.css';
import { Chip } from '../../chip';
import {
    addBalance,
    clearBets,
    hitCard,
    hitCardDealer,
    reduceBalance,
    resetState,
    restoreBets,
    useAppDispatch,
    useGame,
    useUser,
} from '../../../store';
import { ReactComponent as Undo } from '../../../assets/undo.svg';
import { ReactComponent as Redo } from '../../../assets/redo.svg';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../constants';
import { Portal } from '../Portal';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlaceBetsModal = ({ open, setOpen }: Props) => {
    const { player, seats } = useGame();
    const { balance, currency } = useUser();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const totalBet = player.bets.reduce((acc, bet) => acc + seats.byId[bet].amount, 0);

    const handleUndoBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        dispatch(clearBets());
    }, [totalBet, dispatch]);

    const handleRestoreBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        if (player.lastBet <= balance[currency] + totalBet) {
            dispatch(reduceBalance(player.lastBet));
            dispatch(restoreBets());
        }
    }, [dispatch, totalBet, player, balance, currency]);

    const handleClose = useCallback(() => {
        if (seats.allIds.some((id) => seats.byId[id].amount < 5)) {
            setOpen(false);
            dispatch(addBalance(totalBet));
            dispatch(resetState());
            navigate(ROUTES.LOBBY);
        } else {
            setOpen(false);
            for (let i = 0; i < 2; i++) {
                seats.allIds.forEach((id) => {
                    dispatch(hitCard(id));
                });
                dispatch(hitCardDealer());
            }
        }
    }, [seats, totalBet, dispatch]);

    return (
        <Portal open={open}>
            <div className={styles.content}>
                <div className={styles.button} onClick={handleUndoBets}>
                    <Tooltip title="UNDO">
                        <Undo fill="#ffffffd9" />
                    </Tooltip>
                </div>
                <div className={styles.button}>
                    <Chip value={1} />
                </div>
                <div className={styles.button}>
                    <Chip value={5} />
                </div>
                <div className={styles.button}>
                    <Chip value={10} />
                </div>
                <div className={styles.button}>
                    <Chip value={25} />
                </div>
                <div className={styles.button}>
                    <Chip value={100} />
                </div>
                <div className={styles.button} onClick={handleRestoreBets}>
                    <Tooltip title="REPEAT">
                        <Redo fill="#ffffffd9" />
                    </Tooltip>
                </div>
            </div>
            <div className={styles.button} onClick={handleClose}>
                accept
            </div>
        </Portal>
    );
};
