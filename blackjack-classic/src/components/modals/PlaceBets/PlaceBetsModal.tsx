import React from 'react';
import styles from './placebets.styles.module.css';
import { ReactComponent as Undo } from '../../../assets/undo.svg';
import { ReactComponent as Redo } from '../../../assets/redo.svg';
import { ReactComponent as Accept } from '../../../assets/success.svg';
import { Tooltip } from 'antd';
import { Portal } from '../Portal';
import { ChipButton, RoundButton } from '../../buttons';
import { Props } from './placebets.types';
import { useBets } from '../../../hooks';

export const PlaceBetsModal = ({ balance, player, seats, status }: Props) => {
    const { isOpen, isRedoAvailable, handleAcceptBets, handleRestoreBets, handleUndoBets } =
        useBets({
            balance,
            player,
            seats,
            status,
        });

    return (
        <Portal open={isOpen}>
            <div className={styles.content}>
                <RoundButton onClick={handleUndoBets} isAvailable={!!player.bets.length}>
                    <Tooltip title="UNDO">
                        <Undo />
                    </Tooltip>
                </RoundButton>
                {[1, 5, 10, 25, 100].map((value) => (
                    <ChipButton value={value} key={value} balance={balance} bets={player.bets} />
                ))}
                <RoundButton onClick={handleRestoreBets} isAvailable={isRedoAvailable}>
                    <Tooltip title="REPEAT">
                        <Redo />
                    </Tooltip>
                </RoundButton>
            </div>
            <RoundButton onClick={handleAcceptBets}>
                <Tooltip title="ACCEPT BETS">
                    <Accept fill="#ffffffd9" />
                </Tooltip>
            </RoundButton>
        </Portal>
    );
};
