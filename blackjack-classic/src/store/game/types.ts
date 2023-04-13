import { Card } from '../../types/deck';

export interface GameState {
    redCardPos: number;
    deck: Card[];
    seats: Seat[];
    player: Player;
    playingSeat: number;
}

export enum SeatState {
    WIN = 'Win',
    LOSE = 'Lose',
    PUSH = 'Push',
    BUST = 'Bust',
    BJ = 'Blackjack',
}

export interface Win {
    type: SeatState;
    sum: number;
}

export interface Seat {
    id: number;
    score: number;
    cards: Card[];
}

export interface Player {
    lastBet: number;
    lastWin: {
        status: WinStatus | '';
        sum: number;
    };
    blackjackCount: number;
    bets: PlayerBets[];
}

export interface PlayerBets {
    seatId: number;
    bet: number;
    status: SeatState | '';
    win: number | null;
}

export interface AddBetAction {
    id: number;
    bet: number;
}

export interface SetSeatStateAction {
    id: number;
    status: SeatState;
}

export type WinStatus = SeatState.WIN | SeatState.LOSE | SeatState.PUSH;
