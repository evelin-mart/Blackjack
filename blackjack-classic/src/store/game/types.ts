import { Card, DeckType } from '../../types/deck';

export interface Player {
    bet: number;
    score: number;
    cards: Card[];
    blackjackCount: number;
    lastBet: number;
    lastWin: number;
    doubleSeat: null | {
        score: number;
        cards: Card[];
    };
}

export interface Game {
    isRedCardReached: boolean;
    deck: DeckType;
    player: Player;
    dealer: {
        score: number;
        cards: Card[];
    };
}
