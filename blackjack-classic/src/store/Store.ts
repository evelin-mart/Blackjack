import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { GameSlice } from './game';
import { UserSlice } from './user';

export const store = configureStore({
    reducer: {
        [UserSlice.name]: UserSlice.reducer,
        [GameSlice.name]: GameSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
