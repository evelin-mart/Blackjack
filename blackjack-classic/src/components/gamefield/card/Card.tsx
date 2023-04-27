import React from 'react';
import { CardType } from '../../../types';
import styles from './card.styles.module.css';

type Props = {
    card: CardType;
};

export const Card = ({ card }: Props) => {
    return (
        <img
            src={`./assets/${card.suit}/${card.rank}.png`}
            alt={`${card.rank} ${card.suit}`}
            className={styles.card}
        />
    );
};
