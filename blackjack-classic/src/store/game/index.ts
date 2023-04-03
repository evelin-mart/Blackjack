import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Deck } from '../../utils/deck';
import { Game, Player } from './types';

const initialPlayer: Player = {
    bet: 0,
    blackjackCount: 0,
    lastBet: 0,
    lastWin: 0,
    cards: [],
    score: 0,
    doubleSeat: null,
};

const initialState: Game = {
    isRedCardReached: false,
    deck: Deck.shuffle(),
    player: initialPlayer,
    dealer: {
        score: 0,
        cards: [],
    },
};

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addBet(state, action: PayloadAction<number>) {
            state.player.bet += action.payload;
        },
        restoreBet(state, _) {
            state.player.bet = state.player.lastBet;
        },
        clearBet(state, _) {
            state.player.bet = 0;
        },
        splitPair(state, _) {
            const [card1, card2] = state.player.cards;
            const score = state.player.score / 2;
            state.player = {
                ...state.player,
                score,
                cards: [card1],
                doubleSeat: {
                    score,
                    cards: [card2],
                },
            };
        },
        hitCard() {},
        stand() {},
    },
});

export const { addBet, clearBet, hitCard, restoreBet, splitPair, stand } = GameSlice.actions;
