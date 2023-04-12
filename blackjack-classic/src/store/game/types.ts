import { Card } from '../../types/deck';

export interface GameState {
    redCardPos: number;
    deck: Card[];
    seats: Seat[];
    player: Player;
    playingSeat: number;
}

export interface Seat {
    id: number;
    score: number;
    cards: Card[];
}

export interface Player {
    lastBet: number;
    lastWin: number;
    blackjackCount: number;
    bets: PlayerBets[];
}

export interface PlayerBets {
    seatId: number;
    bet: number;
    win: number | null;
}

export interface AddBetAction {
    id: number;
    bet: number;
}
