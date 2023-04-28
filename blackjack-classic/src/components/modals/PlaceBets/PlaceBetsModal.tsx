import React, { useCallback } from 'react';
import styles from './placebets.styles.module.css';
import {
    addBalance,
    clearBets,
    hitCard,
    hitCardDealer,
    reduceBalance,
    resetState,
    restoreBets,
    startGame,
    useAppDispatch,
    useGame,
    useUser,
} from '../../../store';
import { ReactComponent as Undo } from '../../../assets/undo.svg';
import { ReactComponent as Redo } from '../../../assets/redo.svg';
import { Modal, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../constants';
import { Portal } from '../Portal';
import { ChipButton, RoundButton } from '../../buttons';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlaceBetsModal = ({ open, setOpen }: Props) => {
    const { player, seats } = useGame();
    const { balance, currency } = useUser();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const totalBet = player.bets.reduce((acc, bet) => acc + seats.byId[bet].amount, 0);

    const handleUndoBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        dispatch(clearBets());
    }, [totalBet, dispatch]);

    const handleRestoreBets = useCallback(() => {
        dispatch(addBalance(totalBet));
        if (player.lastBet <= balance[currency] + totalBet) {
            dispatch(reduceBalance(player.lastBet));
            dispatch(restoreBets());
        }
    }, [dispatch, totalBet, player, balance, currency]);

    const handleClose = useCallback(() => {
        if (!seats.allIds.filter((id) => seats.byId[id].amount >= 5).length) {
            dispatch(addBalance(totalBet));
            dispatch(resetState());
            Modal.success({
                title: 'Thanks for the game! Come back again!',
                onOk: () => {
                    navigate(ROUTES.LOBBY);
                },
            });
        } else {
            setOpen(false);
            dispatch(startGame());
            for (let i = 0; i < 2; i++) {
                seats.allIds.forEach((id) => {
                    dispatch(hitCard(id));
                });
                dispatch(hitCardDealer());
            }
        }
    }, [seats, totalBet, dispatch]);

    return (
        <Portal open={open}>
            <div className={styles.content}>
                <RoundButton onClick={handleUndoBets}>
                    <Tooltip title="UNDO">
                        <Undo />
                    </Tooltip>
                </RoundButton>
                <ChipButton value={1} />
                <ChipButton value={5} />
                <ChipButton value={10} />
                <ChipButton value={25} />
                <ChipButton value={100} />
                <RoundButton
                    onClick={handleRestoreBets}
                    isAvailable={player.lastBet <= balance[currency]}
                >
                    <Tooltip title="REPEAT">
                        <Redo />
                    </Tooltip>
                </RoundButton>
            </div>
            <RoundButton onClick={handleClose}>accept</RoundButton>
        </Portal>
    );
};
