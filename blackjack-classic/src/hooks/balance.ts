import { useUser } from '../store';

export const useBalance = () => {
    const { balance, currency } = useUser();
    const availableBalance = balance[currency];

    return availableBalance;
};
