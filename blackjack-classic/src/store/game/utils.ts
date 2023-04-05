import { Cost, Rank } from '../../constants/suits';
import { Card } from '../../types/deck';

export const calculateScore = (cards: Card[]) => {
    let sum = cards.reduce((sum, card) => sum + Cost[card.rank], 0);
    if (sum > 21) {
        if (cards.some((card) => card.rank === Rank.Ace)) {
            sum = cards.reduce(
                (sum, card) => (card.rank === Rank.Ace ? sum + 1 : sum + Cost[card.rank]),
                0,
            );
        }
    }
    return sum;
};
