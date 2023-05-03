import React from 'react';
import classNames from 'classnames';
import styles from './roundbutton.styles.module.css';

type Props = {
    onClick: () => void;
    children: any;
    className?: string;
    isAvailable?: boolean;
};

export const RoundButton = ({ onClick, children, isAvailable = true, className }: Props) => {
    const style = classNames(styles.button, className ? className : styles.background, {
        [styles.inactive]: !isAvailable,
    });

    return (
        <div className={style} onClick={onClick}>
            {children}
        </div>
    );
};
