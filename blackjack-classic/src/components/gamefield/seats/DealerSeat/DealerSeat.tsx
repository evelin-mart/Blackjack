import React from 'react';
import styles from '../seats.styles.module.css';
import king from '../../../../assets/Spade/King.png';
import { useDealer } from '../../../../hooks';
import { Tag } from 'antd';

export const DealerSeat = () => {
    const { cards, shownScore } = useDealer();

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
            {shownScore > 0 && (
                <Tag className={styles.score} color="cyan">
                    {shownScore}
                </Tag>
            )}
        </div>
    );
};
