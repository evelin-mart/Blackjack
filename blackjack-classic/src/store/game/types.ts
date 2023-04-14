import { Card } from '../../types/deck';

export enum SeatState {
    WIN = 'Win',
    LOSE = 'Lose',
    PUSH = 'Push',
    BUST = 'Bust',
    BJ = 'Blackjack',
}

export interface Seat {
    id: number;
    score: number;
    cards: Card[];
    amount: number;
    status: SeatState | '';
    blackjackCount: number;
    splittedID?: number;
    originID?: number;
}

export interface WinStatus {
    status: SeatState;
    payout: number;
}

export interface Player {
    bets: number[];
    lastBet: number;
    lastWin?: WinStatus;
}

export interface DealerState {
    score: number;
    cards: Card[];
}

export interface GameState {
    redCardPos: number;
    deck: Card[];
    seats: {
        byId: {
            [x: number]: Seat;
        };
        allIds: number[];
    };
    player: Player;
    dealer: DealerState;
    playingSeat: number;
}
