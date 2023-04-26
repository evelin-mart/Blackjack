import React, { useCallback } from 'react';
import styles from './chip.styles.module.css';
import { colorPicker } from './utils';
import { addBets, reduceBalance, useAppDispatch, useUser } from '../../store';

type Props = {
    value: number;
    isActive?: boolean;
};

export const Chip = ({ value, isActive = true }: Props) => {
    const user = useUser();
    const dispatch = useAppDispatch();

    const color = colorPicker(value);

    const handleClick = useCallback(() => {
        if (isActive) {
            if (value <= user.balance[user.currency]) {
                dispatch(reduceBalance(value));
                dispatch(addBets(value));
            }
        }
    }, [dispatch, value, user, isActive]);

    return (
        <div className={`${styles.chip} ${styles[color]}`} onClick={handleClick}>
            {value}
        </div>
    );
};
