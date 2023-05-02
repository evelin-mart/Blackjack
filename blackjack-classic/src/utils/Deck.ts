import { shuffle } from 'lodash';
import { Rank, Suit, decksInGameCount } from '../constants';
import { CardType } from '../types';

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export class Deck {
    static readonly _ranks = Object.keys(Rank) as (keyof typeof Rank)[];
    static readonly _suits = Object.keys(Suit) as (keyof typeof Suit)[];
    static readonly _deck: CardType[] = this._ranks
        .map((rank) => {
            return this._suits.map((suit) => ({
                rank,
                suit,
            }));
        })
        .flat();

    static shuffle(): CardType[] {
        const decs = shuffle(Array(decksInGameCount).fill(this._deck).flat());
        return decs;
    }

    static getRedCardPos(): number {
        const middle = (this._deck.length * decksInGameCount) / 2;
        return getRandomNumber(middle - 10, middle + 10);
    }
}
