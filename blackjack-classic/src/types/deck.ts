import { Rank, Suit } from '../constants/suits';

export interface Card {
    rank: keyof typeof Rank;
    suit: keyof typeof Suit;
}
