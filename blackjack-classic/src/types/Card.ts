import { Rank, Suit } from "../constants/Suits";

export interface Card {
  rank: keyof typeof Rank;
  suit: keyof typeof Suit;
}
