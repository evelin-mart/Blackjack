import { Card } from '../../types/deck';

export interface Player {
    bet: number;
    score: number;
    cards: Card[];
    blackjackCount: number;
    lastBet: number;
    lastWin: number;
    secondSeat: null | {
        score: number;
        cards: Card[];
    };
}

export interface Game {
    redCardPos: number;
    deck: Card[];
    player: Player;
    dealer: {
        score: number;
        cards: Card[];
    };
}

export enum PlayingSeat {
    Player,
    Second,
    Dealer,
}

export interface endGameAction {
    win: number | null;
}
