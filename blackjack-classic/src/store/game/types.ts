import { CardType } from '../../types/deck';

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
    cards: CardType[];
    amount: number;
    status: SeatStatus | '';
    player: string | null;
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
    cards: CardType[];
}

export enum GameStatus {
    BETS,
    PLAY,
    OVER,
}

export interface GameState {
    redCardPos: number;
    deck: CardType[];
    status: GameStatus;
    seats: {
        byId: {
            [x: number]: SeatState;
        };
        allIds: number[];
    };
    stack: number[];
    player: Player;
    dealer: DealerState;
    playingSeat: number | null;
}

export interface TakePlaceAction {
    id: number;
    player: string;
    amount: number;
}
