import React, { useCallback } from 'react';
import { Chip } from '../../chip';
import { addBets, reduceBalance, useAppDispatch, useUser } from '../../../store';
import { RoundButton } from '../RoundButton';

type Props = {
    value: number;
};

export const ChipButton = ({ value }: Props) => {
    const { balance, currency } = useUser();
    const dispatch = useAppDispatch();

    const isAvailable = value <= balance[currency];

    const handleClick = useCallback(() => {
        if (isAvailable) {
            dispatch(reduceBalance(value));
            dispatch(addBets(value));
        }
    }, [dispatch, isAvailable]);

    return (
        <RoundButton onClick={handleClick} isAvailable={isAvailable}>
            <Chip value={value} />
        </RoundButton>
    );
};
