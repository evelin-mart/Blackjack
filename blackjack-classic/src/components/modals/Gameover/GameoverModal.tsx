import React from 'react';
import { Portal } from '../Portal';
import { SeatStatus, WinStatus, useUser } from '../../../store';
import { Signs } from '../../../constants';
import styles from './gameover.styles.module.css';

type Props = {
    open: boolean;
    status: WinStatus;
};

export const GameoverModal = ({ open, status }: Props) => {
    const { currency } = useUser();
    const content =
        status.status === SeatStatus.WIN
            ? 'you win'
            : status.status === SeatStatus.PUSH
            ? 'push'
            : 'dealer wins';
    return (
        <Portal open={open}>
            <div className={styles.title}>{content}</div>
            {status.payout > 0 && (
                <div className={styles.title}>
                    {Signs[currency]}
                    {status.payout}
                </div>
            )}
        </Portal>
    );
};
