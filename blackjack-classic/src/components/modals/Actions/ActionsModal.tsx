import React from 'react';
import classNames from 'classnames';
import styles from './actions.styles.module.css';
import { Actions } from '../../../constants/actions';
import { ReactComponent as Hit } from '../../../assets/plus.svg';
import { ReactComponent as Stand } from '../../../assets/minus.svg';
import { ReactComponent as Split } from '../../../assets/split.svg';
import { Tooltip } from 'antd';
import { Portal } from '../Portal';
import { RoundButton } from '../../buttons';

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
    return (
        <Portal open={isOpen}>
            <div className={styles.content}>
                <RoundButton
                    className={styles.orange}
                    onClick={onDoubleDown}
                    isAvailable={canDoubleDown}
                >
                    <Tooltip title={Actions.DD}>2x</Tooltip>
                </RoundButton>
                <RoundButton className={styles.green} onClick={onHitCard}>
                    <Tooltip title={Actions.HIT}>
                        <Hit fill="#ffffffd9" />
                    </Tooltip>
                </RoundButton>
                <RoundButton className={styles.red} onClick={onStand}>
                    <Tooltip title={Actions.STAND}>
                        <Stand fill="#ffffffd9" style={{ width: '100%', height: '100%' }} />
                    </Tooltip>
                </RoundButton>
                <RoundButton className={styles.blue} onClick={onSplit} isAvailable={isSplittable}>
                    <Tooltip title={Actions.SPLIT}>
                        <Split fill="#ffffffd9" />
                    </Tooltip>
                </RoundButton>
            </div>
        </Portal>
    );
};
