import React, { useEffect, useState } from 'react';
import { GameStatus, addBalance, placeBets, useAppDispatch, useGame } from '../../store';
import { DealerSeat, PlayerSeat } from './seats';
import { Space } from 'antd';
import styles from './gamefield.styles.module.css';
import { PlaceBetsModal } from '../modals/PlaceBets';
import { GameoverModal } from '../modals/Gameover';
import { useBalance } from '../../hooks';

export const GameField = () => {
    const { player, seats, status } = useGame();
    const balance = useBalance();
    const dispatch = useAppDispatch();
    const [openGameover, setOpenGameover] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (player.lastWin && status === GameStatus.OVER) {
            setOpenGameover(true);

            if (player.lastWin.payout > 0) {
                dispatch(addBalance(player.lastWin.payout));
            }
            timeout = setTimeout(() => {
                setOpenGameover(false);
                dispatch(placeBets());
            }, 3500);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [player.lastWin, status]);

    return (
        <>
            <Space className={styles.field}>
                <DealerSeat />
                <Space size={50}>
                    {seats.allIds.map((id) => (id <= 7 ? <PlayerSeat key={id} id={id} /> : null))}
                </Space>
            </Space>
            <PlaceBetsModal balance={balance} player={player} seats={seats.byId} status={status} />
            {player.lastWin && <GameoverModal open={openGameover} status={player.lastWin} />}
        </>
    );
};
