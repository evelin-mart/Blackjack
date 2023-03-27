import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../types/Card';
import { Seat } from '../types/Seat';
import { Deck } from '../utils/Deck';

interface Game {
  gamesCount: number;
  deck: Card[];
  seats: Seat[];
  player: number;
  dealer: {
    score: number;
  };
}

const initialState: Game = {
  gamesCount: 0,
  deck: Deck.shuffle(),
  seats: [],
  player: 0,
  dealer: {
    score: 0,
  },
};

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    takeSeat() {},
    freeSeat() {},
    addBet() {},
    splitPair() {},
    hitCard() {},
    stand() {},
  },
});
