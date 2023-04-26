import React from 'react';
import styles from '../seats.styles.module.css';
import { useDealer } from '../../../../hooks';
import { Tag } from 'antd';
import back from '../../../../assets/card-back.png';

export const DealerSeat = () => {
    const { cards, shownScore, isDealerTurn } = useDealer();

    return (
        <div className={styles.wrapper}>
            {cards.map((card, i) => {
                if (!isDealerTurn && i === 1) {
                    return (
                        <img
                            src={back}
                            key={i}
                            className={styles.card}
                            style={{ transform: `translateX(${i * 20}px)` }}
                        />
                    );
                }
                return (
                    <img
                        src={`./assets/${card.suit}/${card.rank}.png`}
                        key={i}
                        className={styles.card}
                        style={{ transform: `translateX(${i * 20}px)` }}
                    />
                );
            })}
            {
                <Tag className={styles.score} color="black">
                    {shownScore}
                </Tag>
            }
        </div>
    );
};
