import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Deck } from '../../utils/deck';
import { AddBetAction, GameState, Player, PlayerBets, Seat, SeatState } from './types';
import { calculateScore, calculateWin, calculateWinStatus } from './utils';

const initialBets: PlayerBets = {
    seatId: 1,
    bet: 0,
    status: '',
    win: null,
};

const initialPlayer: Player = {
    blackjackCount: 0,
    lastBet: 0,
    lastWin: {
        status: '',
        sum: 0,
    },
    bets: [initialBets],
};

const initialSeats: Seat[] = Array(2)
    .fill(null)
    .map((_, idx) => ({
        id: idx,
        score: 0,
        cards: [],
    }));

const initialState: GameState = {
    redCardPos: Deck.getRedCardPos(),
    deck: Deck.shuffle(),
    playingSeat: 1,
    player: initialPlayer,
    seats: initialSeats,
};

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addBet(state, action: PayloadAction<AddBetAction>) {
            const { id, bet } = action.payload;
            state.player.bets = state.player.bets.map((seat) =>
                seat.seatId === id ? { ...seat, bet: seat.bet + bet } : seat,
            );
        },
        restoreBet(state) {
            state.player.bets = state.player.bets.map((seat) => ({
                ...seat,
                bet: state.player.lastBet,
            }));
        },
        clearBet(state) {
            state.player.bets = state.player.bets.map((seat) => ({
                ...seat,
                bet: 0,
            }));
        },
        splitPair(state, action: PayloadAction<number>) {
            const seat = state.seats.find((seat) => seat.id === action.payload)!;
            const card = seat.cards.pop()!;
            const score = seat.score / 2;
            const id = state.seats.length;
            seat.score /= 2;
            state.seats.push({
                id,
                score,
                cards: [card],
            });
            state.player.bets.push({
                ...initialBets,
                seatId: id,
                bet: state.player.bets.find((seat) => seat.seatId === action.payload)!.bet,
            });
        },
        hitCard(state, action: PayloadAction<number>) {
            const card = state.deck.pop()!;
            const seat = state.seats.find((seat) => seat.id === action.payload)!;
            seat.cards.push(card);
            seat.score = calculateScore(seat.cards);
            const playerBet = state.player.bets.find((seat) => seat.seatId === action.payload);
            if (playerBet) {
                if (seat.cards.length === 2 && seat.score === 21) {
                    playerBet.status = SeatState.BJ;
                }
                if (seat.score > 21) {
                    playerBet.status = SeatState.BUST;
                }
            }
        },
        endGame(state) {
            state.player.bets = state.player.bets.map((bet) => {
                const seat = state.seats.find((seat) => seat.id === bet.seatId)!;
                const { win, status } = calculateWin(state.seats[0], seat, bet.bet);
                return {
                    ...bet,
                    win,
                    status,
                };
            });
            state.player.lastWin = calculateWinStatus(state.player.bets);
            state.player.lastBet = state.player.bets[0].bet;
        },
        startGame(state) {
            if (state.deck.length <= state.redCardPos) {
                state.deck = Deck.shuffle();
                state.redCardPos = Deck.getRedCardPos();
            }
            state.seats = initialSeats;
            state.player.bets = [initialBets];
            state.playingSeat = 1;
        },
        blackJack(state) {
            state.player.blackjackCount += 1;
        },
        stand(state) {
            state.playingSeat =
                state.playingSeat + 1 >= state.seats.length ? 0 : state.playingSeat + 1;
        },
    },
});

export const { addBet, clearBet, hitCard, restoreBet, splitPair, blackJack, endGame, startGame, stand } =
    GameSlice.actions;
