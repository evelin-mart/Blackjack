import React, { useEffect, useState } from 'react';
import { GameStatus, addBalance, resetState, useAppDispatch, useGame } from '../../store';
import { DealerSeat } from './seats';
import { PlayerSeat } from './seats/PlayerSeat';
import { Space } from 'antd';
import styles from './gamefield.styles.module.css';
import { PlaceBetsModal } from '../modals/PlaceBets';

export const GameField = () => {
    const { player, seats, status } = useGame();
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        let timeout: number;
        if (player.lastWin) {
            if (player.lastWin.payout > 0) {
                dispatch(addBalance(player.lastWin.payout));
            }
            timeout = setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [player.lastWin]);

    useEffect(() => {
        if (status === GameStatus.OVER) {
            setIsModalOpen(true);
        }
    }, [status]);

    return (
        <>
            <Space className={styles.field}>
                <DealerSeat />
                <PlayerSeat seat={seats.byId[0]} />
            </Space>
            <PlaceBetsModal open={isModalOpen} setOpen={setIsModalOpen} />
        </>
    );
};
