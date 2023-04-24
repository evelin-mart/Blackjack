import React from 'react';
import { SeatState } from '../../../../store';
import styles from '../seats.styles.module.css';
import king from '../../../../assets/Spade/King.png';
import { Tag } from 'antd';

type Props = {
    seat: SeatState;
};

const Colors = {
    Win: 'gold',
    Lose: 'red',
    Push: 'blue',
    Bust: 'red',
    Blackjack: 'gold',
};

export const Seat = ({ seat }: Props) => {
    const { cards, status, score } = seat;
    return (
        <div className={styles.wrapper}>
            {cards.map((card, i) => (
                <img
                    src={king}
                    key={i}
                    className={styles.card}
                    style={{ transform: `translate(${i * 20}px, ${i * 20}px)` }}
                />
            ))}
            {score > 0 && (
                <Tag className={styles.score} color="cyan">
                    {score}
                </Tag>
            )}
            {status && (
                <Tag className={styles.status} color={Colors[status]}>
                    {status}
                </Tag>
            )}
        </div>
    );
};
