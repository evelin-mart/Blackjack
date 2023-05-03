import React from 'react';
import { SeatState } from '../../../../store';
import styles from '../seats.styles.module.css';
import { Tag } from 'antd';
import { ActionsModal } from '../../../modals/Actions';
import classNames from 'classnames';

type Props = {
    seat: SeatState;
    balance: number;
    playingSeat: number | null;
};

const Colors = {
    Win: 'success',
    Lose: 'loose',
    Push: 'push',
    Bust: 'loose',
    BJ: 'success',
};

export const Seat = ({ seat, balance, playingSeat }: Props) => {
    const { cards, status, score, id } = seat;

    const style = classNames(styles.wrapper, { [styles.active]: playingSeat === id });

    return (
        <>
            <ActionsModal balance={balance} playingSeat={playingSeat} seat={seat} />
            <div className={style}>
                {cards.map((card, i) => (
                    <img
                        src={`./assets/${card.suit}/${card.rank}.png`}
                        key={i}
                        className={styles.card}
                        style={{ transform: `translate(${i * 18}px, -${i * 27}px)` }}
                    />
                ))}
                {score > 0 && (
                    <Tag className={styles.score} color="black">
                        {score}
                    </Tag>
                )}
                {status && (
                    <div className={styles.status}>
                        <div className={classNames(styles.icon, styles[Colors[status]])} />
                        <Tag color="black">{status}</Tag>
                    </div>
                )}
            </div>
        </>
    );
};
