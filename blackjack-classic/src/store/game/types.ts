import { Card } from '../../types/deck';

export interface GameState {
    redCardPos: number;
    deck: Card[];
    seats: Seat[];
    player: Player;
}

export interface Seat {
    id: number;
    score: number;
    cards: Card[];
}

export interface Player {
    blackjackCount: number;
    lastBet: number;
    lastWin: number;
    bets: PlayerBets[];
}

export interface PlayerBets {
    seatId: number;
    bet: number;
}

export interface AddBetAction {
    id: number;
    bet: number;
}

export interface endGameAction {
    win: number | undefined;
}
