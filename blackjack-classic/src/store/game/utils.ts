import { Cost, Rank } from '../../constants/suits';
import { Card } from '../../types/deck';
import { Seat } from './types';

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

export const calculateWin = (dealerSeat: Seat, playerSeat: Seat, bet: number) => {
    const dealerScore = dealerSeat.score;
    const dealerBlackjack = dealerScore === 21 && dealerSeat.cards.length === 2;
    const playerScore = playerSeat.score;
    const playerBlackjack = playerScore === 21 && playerSeat.cards.length === 2;

    if (playerScore > 21) {
        return -bet;
    }
    if (dealerScore > 21) {
        if (playerBlackjack) {
            return bet * 1.5;
        }
        return bet;
    }
    if (playerScore < dealerScore) {
        return -bet;
    }
    if (playerScore === dealerScore) {
        if (dealerBlackjack && !playerBlackjack) {
            return -bet;
        }
        return 0;
    } else {
        if (playerBlackjack) {
            return bet * 1.5;
        }
        return bet;
    }
};
