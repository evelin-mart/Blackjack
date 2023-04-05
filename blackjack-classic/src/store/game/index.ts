import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Deck } from '../../utils/deck';
import { Game, Player, PlayingSeat, endGameAction } from './types';
import { calculateScore } from './utils';

const initialPlayer: Player = {
    bet: 0,
    blackjackCount: 0,
    lastBet: 0,
    lastWin: 0,
    cards: [],
    score: 0,
    secondSeat: null,
};

const initialDealer = {
    score: 0,
    cards: [],
};

const initialState: Game = {
    redCardPos: Deck.getRedCardPos(),
    deck: Deck.shuffle(),
    player: initialPlayer,
    dealer: initialDealer,
};

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addBet(state, action: PayloadAction<number>) {
            state.player.bet += action.payload;
        },
        restoreBet(state) {
            state.player.bet = state.player.lastBet;
        },
        clearBet(state) {
            state.player.bet = 0;
        },
        splitPair(state) {
            const [card1, card2] = state.player.cards;
            const score = state.player.score / 2;
            state.player = {
                ...state.player,
                score,
                cards: [card1],
                secondSeat: {
                    score,
                    cards: [card2],
                },
            };
        },
        hitCard(state, action: PayloadAction<PlayingSeat>) {
            let card = state.deck.pop();
            switch (action.payload) {
                case PlayingSeat.Player: {
                    state.player.cards.push(card!);
                    state.player.score = calculateScore(state.player.cards);
                    break;
                }
                case PlayingSeat.Second: {
                    state.player.secondSeat!.cards.push(card!);
                    state.player.secondSeat!.score = calculateScore(state.player.secondSeat!.cards);
                    break;
                }
                case PlayingSeat.Dealer: {
                    state.dealer.cards.push(card!);
                    state.dealer.score = calculateScore(state.dealer.cards);
                    break;
                }
            }
        },
        endGame(state, action: PayloadAction<endGameAction>) {
            state.player.lastBet = state.player.bet;
            state.player.lastWin = action.payload.win ? action.payload.win : state.player.lastWin;
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
                    bet: 0,
                    cards: [],
                    score: 0,
                    secondSeat: null,
                },
                dealer: initialDealer,
            };
        },
    },
});

export const { addBet, clearBet, hitCard, restoreBet, splitPair } = GameSlice.actions;
