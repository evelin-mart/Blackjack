import React, { useCallback } from 'react';
import { Chip } from '../../chip';
import { addBets, reduceBalance, useAppDispatch, useGame, useUser } from '../../../store';
import { RoundButton } from '../RoundButton';

type Props = {
    value: number;
};

export const ChipButton = ({ value }: Props) => {
    const { balance, currency } = useUser();
    const { player } = useGame();
    const dispatch = useAppDispatch();

    const isAvailable = !!player.bets.length && value * player.bets.length <= balance[currency];

    const handleClick = useCallback(() => {
        if (isAvailable) {
            dispatch(reduceBalance(value * player.bets.length));
            dispatch(addBets(value));
        }
    }, [dispatch, isAvailable]);

    return (
        <RoundButton onClick={handleClick} isAvailable={isAvailable}>
            <Chip value={value} />
        </RoundButton>
    );
};
