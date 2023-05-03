import { deleteAuthorizedUser, saveAuthorizedUser, saveUserToLocalStorage } from '../../utils';
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const saveUserDataMiddleware: Middleware = (store) => (next) => (action) => {
    if (action.type === 'user/logout') {
        const {
            user: { balance, login, currency },
        } = store.getState() as RootState;
        saveUserToLocalStorage({ balance, login, currency });
        deleteAuthorizedUser();
    }
    if (action.type === 'user/authorize') {
        saveAuthorizedUser(action.payload.login);
    }

    return next(action);
};
