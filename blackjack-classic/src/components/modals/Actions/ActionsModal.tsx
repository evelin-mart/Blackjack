import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './actions.styles.module.css';
import { Actions } from '../../../constants/actions';
import { ReactComponent as Hit } from '../../../assets/plus.svg';
import { ReactComponent as Stand } from '../../../assets/minus.svg';
import { ReactComponent as Split } from '../../../assets/split.svg';
import { Tooltip } from 'antd';

type Props = {
    isOpen: boolean;
    onHitCard: () => void;
    onStand: () => void;
    onDoubleDown: () => void;
    onSplit: () => void;
    isSplittable: boolean;
    canDoubleDown: boolean;
};

export const ActionsModal = ({
    isOpen,
    canDoubleDown,
    isSplittable,
    onDoubleDown,
    onHitCard,
    onSplit,
    onStand,
}: Props) => {
    const style = classNames(styles.mask, { [styles.active]: isOpen });

    return (
        <div className={style}>
            <div className={styles.content}>
                <div
                    className={classNames(styles.button, styles.orange, {
                        [styles.inactive]: !canDoubleDown,
                    })}
                    onClick={onDoubleDown}
                >
                    <Tooltip title={Actions.DD}>2x</Tooltip>
                </div>
                <div className={classNames(styles.button, styles.green)} onClick={onHitCard}>
                    <Tooltip title={Actions.HIT}>
                        <Hit fill="#ffffffd9" />
                    </Tooltip>
                </div>
                <div className={classNames(styles.button, styles.red)} onClick={onStand}>
                    <Tooltip title={Actions.STAND}>
                        <Stand fill="#ffffffd9" style={{ width: '100%', height: '100%' }} />
                    </Tooltip>
                </div>
                <div
                    className={classNames(styles.button, styles.green, {
                        [styles.inactive]: !isSplittable,
                    })}
                    onClick={onSplit}
                >
                    <Tooltip title={Actions.SPLIT}>
                        <Split fill="#ffffffd9" />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
