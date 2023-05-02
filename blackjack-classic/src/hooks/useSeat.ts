import { useCallback } from 'react';
import {
    GameStatus,
    addBalance,
    leaveSeat,
    reduceBalance,
    takeSeat,
    useAppDispatch,
    useGame,
    useUser,
} from '../store';

export const useSeat = (id: number) => {
    const { login, balance, currency } = useUser();
    const { seats, player, status, playingSeat } = useGame();
    const dispatch = useAppDispatch();

    const seat = seats.byId[id];
    const splittedSeat = seat.splittedID && seats.byId[seat.splittedID];

    const canBeTaken =
        !seat.player &&
        ((player.bets.length && balance[currency] >= seats.byId[player.bets[0]].amount) ||
            !player.bets.length) &&
        status === GameStatus.BETS;

    const take = useCallback(() => {
        if (canBeTaken) {
            const amount = player.bets.length ? seats.byId[player.bets[0]].amount : 0;
            if (amount > 0) {
                dispatch(reduceBalance(amount));
            }
            dispatch(
                takeSeat({
                    id: seat.id,
                    player: login,
                    amount,
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

    return { seat, splittedSeat, canBeTaken, take, leave, playingSeat, status, balance: balance[currency] };
};
