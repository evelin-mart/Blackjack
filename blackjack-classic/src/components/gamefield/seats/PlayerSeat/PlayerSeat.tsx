import React, { useCallback } from 'react';
import { Space } from 'antd';
import { Seat } from '../Seat';
import {
    GameStatus,
    SeatState,
    addBalance,
    leaveSeat,
    takeSeat,
    useAppDispatch,
    useGame,
    useUser,
} from '../../../../store';
import styles from './playerseat.styles.module.css';
import { Chip } from '../../../chip';
import classNames from 'classnames';

type Props = {
    seat: SeatState;
};

export const PlayerSeat = ({ seat }: Props) => {
    const { balance, currency, login } = useUser();
    const { seats, player, status } = useGame();
    const dispatch = useAppDispatch();
    const canBeTaken =
        !seat.player &&
        ((player.bets.length && balance[currency] >= seats.byId[player.bets[0]].amount) ||
            !player.bets.length) &&
        status === GameStatus.BETS;
    const style = classNames(styles.bet, { [styles.active]: canBeTaken });

    const take = useCallback(() => {
        if (canBeTaken) {
            dispatch(
                takeSeat({
                    id: seat.id,
                    player: login,
                    amount: player.bets.length ? seats.byId[player.bets[0]].amount : 0,
                }),
            );
        }
    }, [canBeTaken, seats, player]);

    const leave = useCallback(() => {
        if (seat.amount) {
            dispatch(addBalance(seat.amount));
        }
        dispatch(leaveSeat(seat.id));
    }, [seat]);

    return (
        <div className={styles.wrapper}>
            <Space size={25}>
                {seat.splittedID && <Seat seat={seats.byId[seat.splittedID]} />}
                <Seat seat={seat} />
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
