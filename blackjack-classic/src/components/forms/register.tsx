import React from 'react';
import { useAppDispatch } from '../../store';
import { login, logout } from '../../store/user';
import { Currencies } from '../../constants/currencies';
import { hitCard } from '../../store/game';

const Register = () => {
    const dispatch = useAppDispatch();
    return (
        <>
            <button
                onClick={() =>
                    dispatch(
                        login({
                            name: 'Lala',
                            currency: Currencies.EUR,
                            balance: {
                                [Currencies.EUR]: 20,
                                [Currencies.GBP]: 20,
                                [Currencies.USD]: 20,
                            },
                        }),
                    )
                }>
                register
            </button>
            <button onClick={() => dispatch(hitCard())}>unregister</button>
        </>
    );
};

export default Register;