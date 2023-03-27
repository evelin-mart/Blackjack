import { shuffle } from 'lodash';
import { Card } from '../types/Card';
import { Rank, Suit } from '../constants/Suits';
import { decksInGameCount } from '../constants/Deck';

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
    return shuffle(Array(decksInGameCount).fill(this._deck));
  }
}
