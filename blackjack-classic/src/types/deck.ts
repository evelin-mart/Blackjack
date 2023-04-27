import { Rank, Suit } from '../constants/suits';

export interface CardType {
    rank: keyof typeof Rank;
    suit: keyof typeof Suit;
}
