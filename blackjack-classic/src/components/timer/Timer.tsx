import React from 'react';
import styles from './timer.styles.module.css';

type Props = {
    seconds: number;
};

export const Timer = ({ seconds }: Props) => {
    const color = seconds > 5 ? 'green' : 'orange';

    return (
        <div className={styles.wrapper} style={{ borderColor: color }}>
            {seconds}
        </div>
    );
};
