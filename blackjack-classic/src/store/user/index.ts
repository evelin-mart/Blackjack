import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Currencies } from '../../constants/currencies';
import { User, UserState } from './types';

const initialState = {
    isAuth: false,
} as UserState;

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authorize(_, action: PayloadAction<User>) {
            return { isAuth: true, ...action.payload };
        },
        changeCurrency(state, action: PayloadAction<Currencies>) {
            state.currency = action.payload;
        },
        addBalance(state, action: PayloadAction<number>) {
            state.balance[state.currency] += action.payload;
        },
        reduceBalance(state, action: PayloadAction<number>) {
            state.balance[state.currency] -= action.payload;
        },
        logout() {
            return initialState;
        }
    },
});

export const { addBalance, authorize, changeCurrency, reduceBalance, logout } =
    UserSlice.actions;
