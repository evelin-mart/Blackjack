import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Deck } from '../../utils/deck';
import { AddBetAction, Game, Player, PlayerBets } from './types';
import { calculateScore } from './utils';

const initialBets: PlayerBets = {
    seatId: 1,
    bet: 0,
};

const initialPlayer: Player = {
    blackjackCount: 0,
    lastBet: 0,
    lastWin: 0,
    bets: [initialBets],
};

const initialSeat = {
    score: 0,
    cards: [],
};

const initialState: Game = {
    redCardPos: Deck.getRedCardPos(),
    deck: Deck.shuffle(),
    player: initialPlayer,
    seats: [
        { id: 0, ...initialSeat },  //dealer
        { id: 1, ...initialSeat },  //player
    ],
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
            const id = +Date.now();
            seat.score /= 2;
            state.seats.push({
                id,
                score,
                cards: [card],
            });
            state.player.bets.push({
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
        endGame(state, action: PayloadAction<number | undefined>) {
            state.player.lastBet = state.player.bets[0].bet;
            if (action.payload) {
                state.player.lastWin = action.payload;
            }
        },
        shuffleDeck(state) {
            state.deck = Deck.shuffle();
            state.redCardPos = Deck.getRedCardPos();
        },
        blackJack(state) {
            state.player.blackjackCount += 1;
        },
        startGame(state) {
            state = {
                ...state,
                player: {
                    ...state.player,
                },
            };
        },
    },
});

export const { addBet, clearBet, hitCard, restoreBet, splitPair } = GameSlice.actions;
