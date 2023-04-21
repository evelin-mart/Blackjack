import React, { useCallback } from 'react';
import { useGame, useUser } from '../../store';
import { DollarOutlined, EuroOutlined, PoundOutlined } from '@ant-design/icons';
import { ROUTES, Signs } from '../../constants';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

const Items = {
    EUR: <EuroOutlined />,
    GBP: <PoundOutlined />,
    USD: <DollarOutlined />,
};

export const Stats = () => {
    const { currency, balance } = useUser();
    const game = useGame();
    const navigate = useNavigate();

    const totalBet = game.player.bets.reduce((acc, bet) => acc + game.seats.byId[bet].amount, 0);

    const handleClick = useCallback(() => {
        navigate(ROUTES.LOBBY);
    }, [navigate]);

    return (
        <div>
            <span>{Items[currency]}</span>
            <span>
                balance {Signs[currency]}{balance[currency]}
            </span>
            <span>total bet {totalBet}</span>
            <Button type="link" onClick={handleClick}>Lobby</Button>
        </div>
    );
};
