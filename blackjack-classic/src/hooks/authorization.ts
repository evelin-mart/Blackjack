import { Currencies, registrationBonus } from '../constants';
import { useAppDispatch, useUser, authorize } from '../store';
import { UserAuthData } from '../types';
import {
    Jwt,
    getTokenFromLocalStorage,
    getUserFromLocalStorage,
    saveTokenToLocalStorage,
    saveUserToLocalStorage,
} from '../utils';

export const useAuthorization = () => {
    const dispatch = useAppDispatch();
    const user = useUser();

    const registerUser = (payload: UserAuthData, currency: Currencies) => {
        saveTokenToLocalStorage(payload.login, Jwt.signToken(payload));
        const newUser = {
            login: payload.login,
            currency,
            balance: {
                [Currencies.EUR]: 0,
                [Currencies.USD]: 0,
                [Currencies.GBP]: 0,
                [currency]: registrationBonus,
            },
        };
        saveUserToLocalStorage(newUser);
        dispatch(authorize(newUser));
    };

    const login = ({ login, password }: UserAuthData): void | never => {
        const token = getTokenFromLocalStorage(login);
        if (!token) {
            throw new Error('Not registered');
        }
        const decoded = Jwt.decode(token);
        if (!decoded) {
            throw new Error('Not registered');
        }
        if (login === decoded.login && password === decoded.password) {
            const userData = getUserFromLocalStorage(login);
            if (!userData) {
                throw new Error('Something went wrong :(');
            }
            dispatch(authorize(JSON.parse(userData)));
        } else {
            throw new Error('Wrong username or password');
        }
    };

    const updatePassword = (password: string) => {
        saveTokenToLocalStorage(
            user.login,
            Jwt.signToken({
                login: user.login,
                password,
            }),
        );
    };

    return { registerUser, login, updatePassword };
};
