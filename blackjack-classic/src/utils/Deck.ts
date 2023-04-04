import { shuffle } from 'lodash';
import { DeckType } from '../types/deck';
import { Rank, Suit } from '../constants/suits';
import { decksInGameCount } from '../constants/deck';

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export class Deck {
    static readonly _deck: DeckType = (Object.keys(Rank) as unknown[] as (keyof typeof Rank)[])
        .map((rank) => {
            return (Object.keys(Suit) as unknown[] as (keyof typeof Suit)[]).map((suit) => ({
                rank,
                suit,
            }));
        })
        .flat();

    static shuffle(): DeckType {
        const decs = shuffle(Array(decksInGameCount).fill(this._deck).flat());
        const middle = decs.length / 2;
        const redCardPos = getRandomNumber(middle - 5, middle + 5);
        decs.splice(redCardPos, 0, null);
        return decs;
    }
}
