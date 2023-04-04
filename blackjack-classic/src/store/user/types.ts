import { Currencies } from '../../constants/currencies';

export interface User {
    name: string;
    currency: Currencies;
    balance: {
        [x in Currencies]: number;
    };
}

export interface UserState extends User {
    isAuth: boolean;
}
