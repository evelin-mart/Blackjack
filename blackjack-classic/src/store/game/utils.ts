import { Cost, Rank } from '../../constants/suits';
import { Card } from '../../types/deck';
import { DealerState, Seat, SeatState, WinStatus } from './types';

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

export const calculateWin = (dealerSeat: DealerState, playerSeat: Seat): WinStatus => {
    const dealerScore = dealerSeat.score;
    const dealerBlackjack = dealerScore === 21 && dealerSeat.cards.length === 2;
    const playerScore = playerSeat.score;
    const playerBlackjack = playerScore === 21 && playerSeat.cards.length === 2;
    const bet = playerSeat.amount;

    if (playerScore > 21) {
        return {
            payout: 0,
            status: SeatState.BUST,
        };
    }
    if (dealerScore > 21) {
        if (playerBlackjack) {
            return {
                payout: bet * 1.5 * 2,
                status: SeatState.BJ,
            };
        }
        return {
            payout: bet * 2,
            status: SeatState.WIN,
        };
    }
    if (playerScore < dealerScore) {
        return {
            payout: 0,
            status: SeatState.LOSE,
        };
    }
    if (playerScore === dealerScore) {
        if (dealerBlackjack && !playerBlackjack) {
            return {
                payout: 0,
                status: SeatState.LOSE,
            };
        }
        return {
            payout: bet,
            status: SeatState.PUSH,
        };
    } else {
        if (playerBlackjack) {
            return {
                payout: bet * 1.5 * 2,
                status: SeatState.BJ,
            };
        }
        return {
            payout: bet * 2,
            status: SeatState.WIN,
        };
    }
};

export const calculateWinStatus = (acc: WinStatus, current: WinStatus): WinStatus => {
    const payout = acc.payout + current.payout;
    let status = acc.status;

    if (current.status !== SeatState.LOSE) {
        if (current.status !== SeatState.PUSH) {
            status = SeatState.WIN;
        } else if (status !== SeatState.WIN) {
            status = SeatState.PUSH;
        }
    }

    return { status, payout };
};
