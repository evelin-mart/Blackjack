import { Cost, Rank } from '../../constants/suits';
import { CardType } from '../../types/deck';
import { DealerState, SeatStatus, SeatState, WinStatus } from './types';

export const calculateScore = (cards: CardType[]) => {
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

export const calculateWin = (dealerSeat: DealerState, playerSeat: SeatState): WinStatus => {
    const dealerScore = dealerSeat.score;
    const dealerBlackjack = dealerScore === 21 && dealerSeat.cards.length === 2;
    const playerScore = playerSeat.score;
    const playerBlackjack = playerScore === 21 && playerSeat.cards.length === 2;
    const bet = playerSeat.amount;

    if (playerScore > 21) {
        return {
            payout: 0,
            status: SeatStatus.BUST,
        };
    }
    if (dealerScore > 21) {
        if (playerBlackjack) {
            return {
                payout: bet * 1.5 * 2,
                status: SeatStatus.BJ,
            };
        }
        return {
            payout: bet * 2,
            status: SeatStatus.WIN,
        };
    }
    if (playerScore < dealerScore) {
        return {
            payout: 0,
            status: SeatStatus.LOSE,
        };
    }
    if (playerScore === dealerScore) {
        if (dealerBlackjack && !playerBlackjack) {
            return {
                payout: 0,
                status: SeatStatus.LOSE,
            };
        }
        if (!dealerBlackjack && playerBlackjack) {
            return {
                payout: bet * 1.5 * 2,
                status: SeatStatus.BJ,
            };
        }
        return {
            payout: bet,
            status: SeatStatus.PUSH,
        };
    } else {
        if (playerBlackjack) {
            return {
                payout: bet * 1.5 * 2,
                status: SeatStatus.BJ,
            };
        }
        return {
            payout: bet * 2,
            status: SeatStatus.WIN,
        };
    }
};

export const calculateWinStatus = (acc: WinStatus, current: WinStatus): WinStatus => {
    const payout = acc.payout + current.payout;
    let status = acc.status;

    if (current.status === SeatStatus.WIN || current.status === SeatStatus.BJ) {
        status = SeatStatus.WIN;
    }

    if (current.status === SeatStatus.PUSH && status !== SeatStatus.WIN) {
        status = SeatStatus.PUSH;
    }

    return { status, payout };
};
