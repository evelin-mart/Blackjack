import React from 'react';
import { useGame } from '../../store';
import { DealerSeat } from './seats';
import { PlayerSeat } from './seats/PlayerSeat';
import { Space } from 'antd';
import styles from './gamefield.styles.module.css';
import { PlaceBetsModal } from '../modals/PlaceBets';

export const GameField = () => {
    const game = useGame();

    return (
        <>
            <Space className={styles.field}>
                <DealerSeat />
                <PlayerSeat seat={game.seats.byId[0]} />
            </Space>
            <PlaceBetsModal />
        </>
    );
};
