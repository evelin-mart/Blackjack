import { User } from '../store/user/types';

export const saveTokenToLocalStorage = (login: string, token: string) => {
    localStorage.setItem(`${login}-token`, token);
};

export const getTokenFromLocalStorage = (login: string) => {
    return localStorage.getItem(`${login}-token`);
};

export const saveUserToLocalStorage = (user: User) => {
    localStorage.setItem(`${user.login}-data`, JSON.stringify(user));
};

export const getUserFromLocalStorage = (login: string) => {
    return localStorage.getItem(`${login}-data`);
};
