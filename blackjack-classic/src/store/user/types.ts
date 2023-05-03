import { Currencies } from '../../constants/currencies';

export interface User {
    login: string;
    currency: Currencies;
    balance: {
        [x in Currencies]: number;
    };
}

export interface UserState extends User {
    isAuth: boolean;
}
