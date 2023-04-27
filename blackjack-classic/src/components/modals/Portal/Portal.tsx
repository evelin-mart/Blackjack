import React from 'react';
import classNames from 'classnames';
import styles from './portal.styles.module.css';

type Props = {
    children: any;
    open: boolean;
};

export const Portal = ({ children, open }: Props) => {
    const style = classNames(styles.mask, { [styles.active]: open });
    return (
        <div className={style}>
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};
