import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
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

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlaceBetsModal = ({ open, setOpen }: Props) => {
    const game = useGame();
    const user = useUser();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const totalBet = game.player.bets.reduce((acc, bet) => acc + game.seats.byId[bet].amount, 0);
    const style = classNames(styles.mask, { [styles.active]: open });

    const handleUndoBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        dispatch(clearBets());
    }, [totalBet, dispatch]);

    const handleRestoreBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        if (game.player.lastBet <= user.balance[user.currency] + totalBet) {
            dispatch(reduceBalance(game.player.lastBet));
            dispatch(restoreBets());
        }
    }, [dispatch, totalBet, game, user]);

    const handleClose = useCallback(() => {
        if (game.seats.allIds.some((id) => game.seats.byId[id].amount < 5)) {
            setOpen(false);
            dispatch(addBalance(totalBet));
            dispatch(resetState());
            navigate(ROUTES.LOBBY);
        } else {
            setOpen(false);
            for (let i = 0; i < 2; i++) {
                game.seats.allIds.forEach((id) => {
                    dispatch(hitCard(id));
                });
                dispatch(hitCardDealer());
            }
        }
    }, [game, dispatch]);

    return (
        <div className={style}>
            <div className={styles.wrapper}>
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
            </div>
        </div>
    );
};
