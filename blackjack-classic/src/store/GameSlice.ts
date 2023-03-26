import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../types/Card';
import { Deck } from '../utils/Deck';

interface Game {
  gamesCount: number;
  deck: Card[];
}

const initialState: Game = {
  gamesCount: 0,
  deck: Deck.shuffle(),
}

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {}
})