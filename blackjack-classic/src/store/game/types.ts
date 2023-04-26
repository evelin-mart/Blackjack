import { Card } from '../../types/deck';

export enum SeatStatus {
    WIN = 'Win',
    LOSE = 'Lose',
    PUSH = 'Push',
    BUST = 'Bust',
    BJ = 'BJ',
}

export interface SeatState {
    id: number;
    score: number;
    cards: Card[];
    amount: number;
    status: SeatStatus | '';
    blackjackCount: number;
    splittedID?: number;
    originID?: number;
}

export interface WinStatus {
    status: SeatStatus;
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

export enum GameStatus {
    PLAY,
    OVER,
}

export interface GameState {
    redCardPos: number;
    deck: Card[];
    status: GameStatus;
    seats: {
        byId: {
            [x: number]: SeatState;
        };
        allIds: number[];
    };
    player: Player;
    dealer: DealerState;
    playingSeat: number;
}
