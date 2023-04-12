import { useEffect, useState } from 'react';
import { useAppDispatch, useGame } from '../store';
import { blackJack } from '../store/game';

export enum SeatState {
    WIN = 'Win',
    LOSE = 'Lose',
    PUSH = 'Push',
    BUST = 'Bust',
    BJ = 'Blackjack',
}

export const useSeatState = (id: number) => {
    const dispatch = useAppDispatch();
    const [seatState, setSeatState] = useState<SeatState | ''>('');
    const { seats, player } = useGame();
    const { cards, score } = seats.find((seat) => seat.id === id)!;
    const { win } = player.bets.find((seat) => seat.seatId === id)!;

    useEffect(() => {
        if (cards.length === 2 && score === 21) {
            setSeatState(SeatState.BJ);
            dispatch(blackJack());
        }
        if (score > 21) {
            setSeatState(SeatState.BUST);
        }
    }, [cards, score]);

    useEffect(() => {
        if (win && win > 0) {
            setSeatState(SeatState.WIN);
        }
        if (win && win === 0) {
            setSeatState(SeatState.PUSH);
        }
        if (win && win < 0) {
            setSeatState(SeatState.LOSE);
        }
    }, [win]);

    return { seatState, score };
};
