import { createSlice } from '@reduxjs/toolkit';
import { Currencies } from '../types/Currencies';

interface User {
  name: string;
  currency: Currencies;
  balance: {
    [x in keyof Currencies]: number;
  };
}

type UserState = User | null;

const initialState: UserState = null;

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser() {},
    updateUserName() {},
    changeCurrency() {},
    addBalance() {},
    reduceBalance() {},
  },
});

export const { addBalance, addUser, changeCurrency, reduceBalance, updateUserName } =
  UserSlice.actions;
