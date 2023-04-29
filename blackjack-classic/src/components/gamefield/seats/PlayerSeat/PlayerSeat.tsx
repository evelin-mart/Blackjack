import React from 'react';
import { Space } from 'antd';
import { Seat } from '../Seat';
import { SeatState, useGame, useUser } from '../../../../store';
import styles from './playerseat.styles.module.css';
import { Chip } from '../../../chip';
import classNames from 'classnames';

type Props = {
    seat: SeatState;
};

export const PlayerSeat = ({ seat }: Props) => {
    const { balance, currency } = useUser();
    const { seats, player } = useGame();
    const canBeTaken =
        !seat.player &&
        ((player.bets.length && balance[currency] >= player.bets[0]) || !player.bets.length);
    const style = classNames(styles.bet, { [styles.active]: canBeTaken });

    return (
        <div className={styles.wrapper}>
            <Space size={25}>
                {seat.splittedID && <Seat seat={seats.byId[seat.splittedID]} />}
                <Seat seat={seat} />
            </Space>
            <div className={style}>{seat.amount > 0 && <Chip value={seat.amount} />}</div>
            <div className={styles.user}>
                {seat.blackjackCount > 0 && (
                    <div className={styles.count}>{seat.blackjackCount}</div>
                )}
                <div className={styles.login}>{seat.player}</div>
            </div>
        </div>
    );
};
