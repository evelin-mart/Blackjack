import { Cost, Rank } from '../../constants/suits';
import { Card } from '../../types/deck';
import { PlayerBets, Seat, SeatState, WinStatus } from './types';

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
        return {
            win: 0,
            status: SeatState.BUST,
        };
    }
    if (dealerScore > 21) {
        if (playerBlackjack) {
            return {
                win: bet * 1.5 * 2,
                status: SeatState.BJ,
            };
        }
        return {
            win: bet * 2,
            status: SeatState.WIN,
        };
    }
    if (playerScore < dealerScore) {
        return {
            win: 0,
            status: SeatState.LOSE,
        };
    }
    if (playerScore === dealerScore) {
        if (dealerBlackjack && !playerBlackjack) {
            return {
                win: 0,
                status: SeatState.LOSE,
            };
        }
        return {
            win: bet,
            status: SeatState.PUSH,
        };
    } else {
        if (playerBlackjack) {
            return {
                win: bet * 1.5 * 2,
                status: SeatState.BJ,
            };
        }
        return {
            win: bet * 2,
            status: SeatState.WIN,
        };
    }
};

export const calculateWinStatus = (playerBets: PlayerBets[]) => {
    let status: WinStatus = SeatState.LOSE;
    let sum = 0;
    playerBets.forEach((bet) => {
        sum += bet.win!;
        if (bet.status !== SeatState.LOSE) {
            if (bet.status !== SeatState.PUSH) {
                status = SeatState.WIN;
            } else {
                if (status !== SeatState.WIN) {
                    status = SeatState.PUSH;
                }
            }
        }
    });

    return { status, sum };
};
