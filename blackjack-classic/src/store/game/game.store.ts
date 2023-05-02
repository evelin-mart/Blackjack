import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Deck } from '../../utils/deck';
import {
    GameState,
    GameStatus,
    Player,
    SeatStatus,
    SeatState,
    WinStatus,
    TakePlaceAction,
} from './types';
import { calculateScore, calculateWin, calculateWinStatus } from './utils';

const initialPlayer: Player = {
    bets: [],
    lastBet: 0,
};

const initialSeat: SeatState = {
    id: 0,
    score: 0,
    cards: [],
    amount: 0,
    status: '',
    player: null,
    blackjackCount: 0,
};

const initialDealer = {
    score: 0,
    cards: [],
};

const initialStack = [0];

const initialIds = [1, 2, 3, 4, 5, 6, 7];

const initialSeats = initialIds.reduce((acc, id) => {
    acc[id] = {
        ...initialSeat,
        id: id,
    };
    return acc;
}, {} as typeof initialState.seats.byId);

const initialState: GameState = {
    redCardPos: Deck.getRedCardPos(),
    deck: Deck.shuffle(),
    status: GameStatus.BETS,
    seats: {
        byId: initialSeats,
        allIds: initialIds,
    },
    stack: initialStack,
    player: initialPlayer,
    dealer: initialDealer,
    playingSeat: null,
};

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        takeSeat(state, action: PayloadAction<TakePlaceAction>) {
            const { amount, id, player } = action.payload;
            state.player.bets.push(id);
            state.seats.byId[id] = {
                ...state.seats.byId[id],
                amount,
                player,
            };
        },
        leaveSeat(state, action: PayloadAction<number>) {
            state.seats.byId[action.payload] = {
                ...initialSeat,
                id: action.payload,
            };
            state.player.bets = state.player.bets.filter((id) => id !== action.payload);
        },
        addBets(state, action: PayloadAction<number>) {
            state.player.bets.map((id) => (state.seats.byId[id].amount += action.payload));
        },
        doubleBet(state) {
            state.seats.byId[state.playingSeat!].amount *= 2;
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
            const id = +Date.now();
            seat.score /= 2;
            seat.splittedID = id;
            state.seats.byId[id] = {
                ...initialSeat,
                id,
                score,
                cards: [card],
                originID: seat.id,
                player: seat.player,
                amount: seat.amount,
            };
            state.seats.allIds.push(id);
            state.player.bets.push(id);
            state.stack.push(id);
        },
        hitCard(state, action: PayloadAction<number>) {
            const card = state.deck.pop()!;
            const seat = state.seats.byId[action.payload];
            seat.cards.push(card);
            const score = calculateScore(seat.cards);
            seat.score = score;
            if (seat.cards.length === 2 && score === 21) {
                seat.status = SeatStatus.BJ;
                if ('originID' in seat) {
                    state.seats.byId[seat.originID!].blackjackCount += 1;
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
        startGame(state) {
            state.status = GameStatus.PLAY;
            const stack = [...state.player.bets.sort()];
            state.playingSeat = stack.pop()!;
            state.stack.push(...stack);
            state.player.lastBet = state.seats.byId[state.player.bets[0]].amount;
        },
        endGame(state) {
            state.status = GameStatus.OVER;
            state.player.lastWin = state.player.bets.reduce(
                (acc: WinStatus, id) => {
                    const seat = state.seats.byId[id];
                    const win = calculateWin(state.dealer, seat);
                    seat.status = win.status;
                    return calculateWinStatus(acc, win);
                },
                { status: SeatStatus.LOSE, payout: 0 },
            );
            if (state.deck.length <= state.redCardPos) {
                state.deck = Deck.shuffle();
                state.redCardPos = Deck.getRedCardPos();
            }
        },
        placeBets(state) {
            state.status = GameStatus.BETS;
            state.dealer = {
                score: 0,
                cards: [],
            };
            const newSeats = initialIds.reduce((acc, id) => {
                acc[id] = {
                    ...initialSeat,
                    id: state.seats.byId[id].id,
                    player: state.seats.byId[id].player,
                    blackjackCount: state.seats.byId[id].blackjackCount,
                };
                return acc;
            }, {} as typeof state.seats.byId);
            const newBets = state.player.bets.filter((id) => id <= 7);
            state.player.bets = newBets;
            state.seats.allIds = initialIds;
            state.seats.byId = newSeats;
            state.playingSeat = null;
            state.stack = [0];
        },
        reset(state) {
            state.dealer = initialState.dealer;
            state.deck = Deck.shuffle();
            state.redCardPos = Deck.getRedCardPos();
            state.player = initialState.player;
            state.playingSeat = null;
            state.seats = {
                byId: initialSeats,
                allIds: initialIds,
            };
            state.stack = initialStack;
            state.status = GameStatus.BETS;
        },
        stand(state) {
            state.playingSeat = state.stack.pop()!;
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
    placeBets,
    doubleBet,
    startGame,
    leaveSeat,
    takeSeat,
    reset,
} = GameSlice.actions;
