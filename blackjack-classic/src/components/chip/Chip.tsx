import React from 'react';
import styles from './chip.styles.module.css';
import { colorPicker } from './utils';
import classNames from 'classnames';

type Props = {
    value: number;
};

export const Chip = ({ value }: Props) => {
    const color = colorPicker(value);
    const style = classNames(styles.chip, styles[color]);

    return <div className={style}>{value}</div>;
};
