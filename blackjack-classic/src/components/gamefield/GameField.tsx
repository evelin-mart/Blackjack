import React, { useEffect, useState } from 'react';
import { GameStatus, addBalance, resetState, useAppDispatch, useGame } from '../../store';
import { DealerSeat } from './seats';
import { PlayerSeat } from './seats/PlayerSeat';
import { Space } from 'antd';
import styles from './gamefield.styles.module.css';
import { PlaceBetsModal } from '../modals/PlaceBets';
import { GameoverModal } from '../modals/Gameover';

export const GameField = () => {
    const { player, seats, status } = useGame();
    const dispatch = useAppDispatch();
    const [openBets, setOpenBets] = useState(true);
    const [openGameover, setOpenGameover] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (player.lastWin && status === GameStatus.PLAY) {
            setOpenGameover(true);

            if (player.lastWin.payout > 0) {
                dispatch(addBalance(player.lastWin.payout));
            }
            timeout = setTimeout(() => {
                setOpenGameover(false);
                dispatch(resetState());
            }, 3500);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [player.lastWin]);

    useEffect(() => {
        if (status === GameStatus.OVER) {
            setOpenBets(true);
        }
    }, [status]);

    return (
        <>
            <Space className={styles.field}>
                <DealerSeat />
                <PlayerSeat seat={seats.byId[0]} />
            </Space>
            <PlaceBetsModal open={openBets} setOpen={setOpenBets} />
            <GameoverModal open={openGameover} status={player.lastWin!} />
        </>
    );
};
