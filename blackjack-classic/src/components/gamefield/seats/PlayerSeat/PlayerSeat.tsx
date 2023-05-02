import React from 'react';
import { Space } from 'antd';
import { Seat } from '../Seat';
import { GameStatus } from '../../../../store';
import styles from './playerseat.styles.module.css';
import { Chip } from '../../../chip';
import classNames from 'classnames';
import { useSeat } from '../../../../hooks';

type Props = {
    id: number;
};

export const PlayerSeat = ({ id }: Props) => {
    const { canBeTaken, take, leave, seat, splittedSeat, playingSeat, status, balance } =
        useSeat(id);

    const style = classNames(styles.bet, { [styles.active]: canBeTaken });

    return (
        <div className={styles.wrapper}>
            <Space size={25}>
                {splittedSeat && (
                    <Seat seat={splittedSeat} balance={balance} playingSeat={playingSeat} />
                )}
                <Seat seat={seat} balance={balance} playingSeat={playingSeat} />
            </Space>
            <div className={style} onClick={take}>
                {seat.amount > 0 && <Chip value={seat.amount} />}
            </div>
            <div className={styles.user}>
                {seat.blackjackCount > 0 && (
                    <div className={styles.count}>{seat.blackjackCount}</div>
                )}
                <div className={styles.login}>{seat.player}</div>
                {seat.player && status === GameStatus.BETS && (
                    <div className={styles.leave} onClick={leave}>
                        X
                    </div>
                )}
            </div>
        </div>
    );
};
