import React, { useCallback } from 'react';
import { GameStatus, addBalance, resetState, useAppDispatch, useGame, useUser } from '../../store';
import { DollarOutlined, EuroOutlined, PoundOutlined } from '@ant-design/icons';
import { ROUTES, Signs } from '../../constants';
import { Button, Modal, Space, Tag } from 'antd';
import { useNavigate } from 'react-router';

const Items = {
    EUR: <EuroOutlined />,
    GBP: <PoundOutlined />,
    USD: <DollarOutlined />,
};

export const Stats = () => {
    const { currency, balance } = useUser();
    const { status, seats, player } = useGame();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const totalBet = player.bets.reduce((acc, bet) => acc + seats.byId[bet].amount, 0);

    const handleClick = useCallback(() => {
        if (status === GameStatus.PLAY) {
            Modal.confirm({
                title: 'Are you sure want to exit?',
                content: 'You will lose your money!',
                onOk: () =>
                    Modal.success({
                        title: 'Thanks for the game! Come back again!',
                        onOk: () => {
                            dispatch(resetState());
                            Modal.destroyAll();
                            navigate(ROUTES.LOBBY);
                        },
                    }),
            });
        } else {
            Modal.success({
                title: 'Thanks for the game! Come back again!',
                onOk: () => {
                    if (totalBet > 0 && status === GameStatus.BETS) {
                        dispatch(addBalance(totalBet));
                    }
                    dispatch(resetState());
                    navigate(ROUTES.LOBBY);
                },
            });
        }
    }, [navigate, totalBet, status]);

    return (
        <>
            <Space>
                <Tag color="#004b10">{Items[currency]}</Tag>
                <Tag color="#004b10">
                    balance {Signs[currency]}
                    {balance[currency]}
                </Tag>
                <Tag color="#004b10">
                    total bet {Signs[currency]}
                    {totalBet}
                </Tag>
            </Space>
            <Button type="link" onClick={handleClick}>
                Lobby
            </Button>
        </>
    );
};
