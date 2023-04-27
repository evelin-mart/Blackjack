import React from 'react';
import { Space } from 'antd';
import { Seat } from '../Seat';
import { SeatState, useGame, useUser } from '../../../../store';
import styles from './playerseat.styles.module.css';
import { Chip } from '../../../chip';

type Props = {
    seat: SeatState;
};

export const PlayerSeat = ({ seat }: Props) => {
    const user = useUser();
    const game = useGame();

    return (
        <div className={styles.wrapper}>
            <Space size={20}>
                <Seat seat={seat} />
                {seat.splittedID && <Seat seat={game.seats.byId[seat.splittedID]} />}
            </Space>
            <div className={styles.bet}>
                {seat.amount > 0 && <Chip value={seat.amount} isActive={false} />}
            </div>
            <div className={styles.user}>
                {seat.blackjackCount > 0 && (
                    <div className={styles.count}>{seat.blackjackCount}</div>
                )}
                <div className={styles.login}>{user.login}</div>
            </div>
        </div>
    );
};
