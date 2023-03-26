import { Card, Rank, Suit } from '../types/Card';

export class Deck {
  static readonly _deck: Card[] = (Object.keys(Rank) as unknown[] as (keyof typeof Rank)[])
    .map((rank) => {
      return (Object.keys(Suit) as unknown[] as (keyof typeof Suit)[])
        .map((suit) => ({
          rank,
          suit,
        }));
    })
    .flat();

  static shuffle(): Card[] {
    return Array(6).fill(this._deck);
  }
}
