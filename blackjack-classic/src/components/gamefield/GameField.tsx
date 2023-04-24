import React from 'react';
import { useGame } from '../../store';
import { DealerSeat } from './seats';
import { PlayerSeat } from './seats/PlayerSeat';
import { Space } from 'antd';
import styles from './gamefield.styles.module.css';

export const GameField = () => {
    const game = useGame();

    return (
        <Space className={styles.field}>
            <DealerSeat />
            <PlayerSeat seat={game.seats.byId[0]} />
        </Space>
    );
};
