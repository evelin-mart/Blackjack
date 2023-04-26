import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './actions.styles.module.css';
import { Actions } from '../../../constants/actions';
import { ReactComponent as Hit } from '../../../assets/plus.svg';
import { ReactComponent as Stand } from '../../../assets/minus.svg';
import { ReactComponent as Split } from '../../../assets/split.svg';

export const ActionsModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const style = classNames(styles.mask, { [styles.active]: isModalOpen });

    return (
        <div className={style}>
            <div className={styles.content}>
                <div className={styles.button}>
                    <Hit fill="#ffffffd9" />
                </div>
                <div className={styles.button}>
                    <Stand fill="#ffffffd9" />
                </div>
                <div className={styles.button}>
                    <Split fill="#ffffffd9" />
                </div>
            </div>
        </div>
    );
};
