import React, { useEffect, useState } from 'react';
import { GameStatus, addBalance, resetState, useAppDispatch, useGame, useUser } from '../../store';
import { DealerSeat } from './seats';
import { PlayerSeat } from './seats/PlayerSeat';
import { Button, Modal, Space } from 'antd';
import styles from './gamefield.styles.module.css';
import { PlaceBetsModal } from '../modals/PlaceBets';
import { GameoverModal } from '../modals/Gameover';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants';
import { useBalance } from '../../hooks/balance';

export const GameField = () => {
    const { player, seats, status } = useGame();
    const balance = useBalance();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [openBets, setOpenBets] = useState(true);
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
                dispatch(resetState());
            }, 3500);
        }
        if (status === GameStatus.BETS) {
            if (balance > 5) {
                setOpenBets(true);
            } else {
                Modal.success({
                    title: 'Thanks for the game! Come back again!',
                    content: (
                        <Button
                            onClick={() => {
                                Modal.destroyAll();
                                navigate(ROUTES.PROFILE);
                            }}
                        >
                            Top up the balance
                        </Button>
                    ),
                    onOk: () => {
                        navigate(ROUTES.LOBBY);
                    },
                });
            }
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
                    {seats.allIds.map((id) =>
                        id <= 7 ? (
                            <PlayerSeat key={id} seat={seats.byId[id]} balance={balance} />
                        ) : null,
                    )}
                </Space>
            </Space>
            <PlaceBetsModal
                open={openBets}
                setOpen={setOpenBets}
                balance={balance}
                player={player}
                seats={seats.byId}
            />
            {player.lastWin && <GameoverModal open={openGameover} status={player.lastWin} />}
        </>
    );
};
