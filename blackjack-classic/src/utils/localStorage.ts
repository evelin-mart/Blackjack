import { User } from '../store';

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

export const saveAuthorizedUser = (login: string) => {
    localStorage.setItem(`authorized`, login);
};

export const deleteAuthorizedUser = () => {
    localStorage.removeItem(`authorized`);
};

export const getAuthorizedUser = () => {
    const login = localStorage.getItem(`authorized`);
    if (!login) {
        return null;
    }

    return getUserFromLocalStorage(login);
};

export const deleteUser = (login: string) => {
    localStorage.removeItem(`${login}-data`);
    localStorage.removeItem(`${login}-token`);
};
