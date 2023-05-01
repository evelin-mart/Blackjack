import React, { useCallback } from 'react';
import { Chip } from '../../chip';
import { addBets, reduceBalance, useAppDispatch } from '../../../store';
import { RoundButton } from '../RoundButton';

type Props = {
    value: number;
    balance: number;
    bets: number[];
};

export const ChipButton = ({ value, balance, bets }: Props) => {
    const dispatch = useAppDispatch();

    const isAvailable = !!bets.length && value * bets.length <= balance;

    const handleClick = useCallback(() => {
        if (isAvailable) {
            dispatch(reduceBalance(value * bets.length));
            dispatch(addBets(value));
        }
    }, [dispatch, isAvailable, bets]);

    return (
        <RoundButton onClick={handleClick} isAvailable={isAvailable}>
            <Chip value={value} />
        </RoundButton>
    );
};
