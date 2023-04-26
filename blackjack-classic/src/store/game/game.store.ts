import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Deck } from '../../utils/deck';
import { GameState, GameStatus, Player, SeatStatus, SeatState, WinStatus } from './types';
import { calculateScore, calculateWin, calculateWinStatus } from './utils';

const initialPlayer: Player = {
    bets: [0],
    lastBet: 0,
};

const initialSeat: SeatState = {
    id: 0,
    score: 0,
    cards: [],
    amount: 0,
    status: '',
    blackjackCount: 0,
};

const initialDealer = {
    score: 0,
    cards: [],
};

const initialState: GameState = {
    redCardPos: Deck.getRedCardPos(),
    deck: Deck.shuffle(),
    status: GameStatus.OVER,
    seats: {
        byId: {
            0: initialSeat,
        },
        allIds: [0],
    },
    player: initialPlayer,
    dealer: initialDealer,
    playingSeat: 0,
};

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addBets(state, action: PayloadAction<number>) {
            state.player.bets.map((id) => (state.seats.byId[id].amount += action.payload));
        },
        doubleBet(state) {
            state.seats.byId[state.playingSeat].amount *= 2;
        },
        restoreBets(state) {
            state.player.bets.map((id) => (state.seats.byId[id].amount = state.player.lastBet));
        },
        clearBets(state) {
            state.player.bets.map((id) => (state.seats.byId[id].amount = 0));
        },
        splitPair(state, action: PayloadAction<number>) {
            const seat = state.seats.byId[action.payload];
            const card = seat.cards.pop()!;
            const score = seat.score / 2;
            const id = state.seats.allIds.length;
            seat.score /= 2;
            seat.splittedID = id;
            state.seats.byId[id] = {
                ...initialSeat,
                id,
                score,
                cards: [card],
                originID: seat.id,
            };
            state.seats.allIds.push(id);
            state.player.bets.push(id);
        },
        hitCard(state, action: PayloadAction<number>) {
            if (state.status !== GameStatus.PLAY) {
                state.status = GameStatus.PLAY;
            }
            const card = state.deck.pop()!;
            const seat = state.seats.byId[action.payload];
            seat.cards.push(card);
            const score = calculateScore(seat.cards);
            seat.score = score;
            if (seat.cards.length === 2 && seat.score === 21) {
                seat.status = SeatStatus.BJ;
                if (seat.originID) {
                    state.seats.byId[seat.originID].blackjackCount += 1;
                } else {
                    seat.blackjackCount += 1;
                }
            }
            if (score > 21) {
                seat.status = SeatStatus.BUST;
            }
        },
        hitCardDealer(state) {
            const card = state.deck.pop()!;
            state.dealer.cards.push(card);
            state.dealer.score = calculateScore(state.dealer.cards);
        },
        endGame(state) {
            state.player.lastWin = state.player.bets.reduce(
                (acc: WinStatus, id) => {
                    const seat = state.seats.byId[id];
                    const win = calculateWin(state.dealer, seat);
                    seat.status = win.status;
                    return calculateWinStatus(acc, win);
                },
                { status: SeatStatus.LOSE, payout: 0 },
            );
        },
        resetState(state) {
            state.status = GameStatus.OVER;
            state.player.lastBet = state.seats.byId[0].amount;
            if (state.deck.length <= state.redCardPos) {
                state.deck = Deck.shuffle();
                state.redCardPos = Deck.getRedCardPos();
            }
            state.dealer = {
                score: 0,
                cards: [],
            };
            state.seats.allIds = state.seats.allIds.filter((id) => {
                const seat = state.seats.byId[id];
                const splitted = !!seat.originID;
                if (splitted) {
                    delete state.seats.byId[id];
                } else {
                    delete seat.splittedID;
                    state.seats.byId[id] = {
                        ...seat,
                        score: 0,
                        cards: [],
                        amount: 0,
                        status: '',
                    };
                }
                return !splitted;
            });
            state.player.bets = state.player.bets.filter((id) => !state.seats.byId[id].originID);
            state.playingSeat = 0;
        },
        stand(state) {
            state.playingSeat += 1;
        },
    },
});

export const {
    addBets,
    clearBets,
    hitCard,
    hitCardDealer,
    restoreBets,
    splitPair,
    endGame,
    stand,
    resetState,
    doubleBet,
} = GameSlice.actions;
