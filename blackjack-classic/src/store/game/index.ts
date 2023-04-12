import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Deck } from '../../utils/deck';
import { AddBetAction, GameState, Player, PlayerBets, Seat } from './types';
import { calculateScore, calculateWin } from './utils';

const initialBets: PlayerBets = {
    seatId: 1,
    bet: 0,
    win: null,
};

const initialPlayer: Player = {
    blackjackCount: 0,
    lastBet: 0,
    lastWin: 0,
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
        },
        endGame(state) {
            let lastWin = 0;
            let lastBet = state.player.lastBet;
            state.player.bets = state.player.bets.map((bet) => {
                lastBet = bet.bet;
                const seat = state.seats.find((seat) => seat.id === bet.seatId)!;
                const win = calculateWin(state.seats[0], seat, bet.bet);
                lastWin += win;
                return {
                    ...bet,
                    win,
                };
            });
            state.player.lastWin = lastWin;
            state.player.lastBet = lastBet;
        },
        shuffleDeck(state) {
            state.deck = Deck.shuffle();
            state.redCardPos = Deck.getRedCardPos();
        },
        blackJack(state) {
            state.player.blackjackCount += 1;
        },
    },
});

export const { addBet, clearBet, hitCard, restoreBet, splitPair, blackJack, endGame, shuffleDeck } =
    GameSlice.actions;
