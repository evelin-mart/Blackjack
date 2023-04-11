import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { GameSlice } from './game';
import { UserSlice } from './user';
import { UserState } from './user/types';
import { GameState } from './game/types';

export const store = configureStore({
    reducer: {
        [UserSlice.name]: UserSlice.reducer,
        [GameSlice.name]: GameSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useUser = () => useSelector<RootState, UserState>((state) => state[UserSlice.name]);
export const useGame = () => useSelector<RootState, GameState>((state) => state[GameSlice.name]);
