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
        login(_, action: PayloadAction<User>) {
            return { isAuth: true, ...action.payload };
        },
        updateUserName(state, action: PayloadAction<string>) {
            state.name = action.payload;
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

export const { addBalance, login, changeCurrency, reduceBalance, updateUserName, logout } =
    UserSlice.actions;
