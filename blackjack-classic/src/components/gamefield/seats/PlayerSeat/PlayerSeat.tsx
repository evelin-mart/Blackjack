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
    const { login } = useUser();
    const { seats } = useGame();

    return (
        <div className={styles.wrapper}>
            <Space size={25}>
                <Seat seat={seat} />
                {seat.splittedID && <Seat seat={seats.byId[seat.splittedID]} />}
            </Space>
            <div className={styles.bet}>{seat.amount > 0 && <Chip value={seat.amount} />}</div>
            <div className={styles.user}>
                {seat.blackjackCount > 0 && (
                    <div className={styles.count}>{seat.blackjackCount}</div>
                )}
                <div className={styles.login}>{login}</div>
            </div>
        </div>
    );
};
