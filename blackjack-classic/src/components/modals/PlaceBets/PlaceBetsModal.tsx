import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import styles from './placebets.styles.module.css';
import { Chip } from '../../chip';
import {
    addBalance,
    clearBets,
    reduceBalance,
    restoreBets,
    useAppDispatch,
    useGame,
    useUser,
} from '../../../store';

export const PlaceBetsModal = () => {
    const game = useGame();
    const user = useUser();
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const totalBet = game.player.bets.reduce((acc, bet) => acc + game.seats.byId[bet].amount, 0);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    const style = classNames(styles.mask, { [styles.active]: isModalOpen });

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
    }, [dispatch, totalBet]);

    return (
        <div className={style}>
            <div className={styles.wrapper}>
                <div className={styles.button} onClick={handleUndoBets} />
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
                <div className={styles.button} onClick={handleRestoreBets} />
            </div>
        </div>
    );
};
