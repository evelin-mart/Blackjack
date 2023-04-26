import React from 'react';
import { SeatState } from '../../../../store';
import styles from '../seats.styles.module.css';
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
                    src={`./assets/${card.suit}/${card.rank}.png`}
                    key={i}
                    className={styles.card}
                    style={{ transform: `translate(${i * 16}px, -${i * 16}px)` }}
                />
            ))}
            {score > 0 && (
                <Tag className={styles.score} color="black">
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
