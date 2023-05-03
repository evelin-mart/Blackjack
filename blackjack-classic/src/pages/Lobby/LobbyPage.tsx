import React, { useCallback } from 'react';
import { Card, Space, Tag } from 'antd';
import img from '../../assets/mock.jpg';
import { useUser } from '../../store';
import { ROUTES, Signs } from '../../constants';
import { useNavigate } from 'react-router';

export const LobbyPage = () => {
    const { currency } = useUser();
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(ROUTES.GAME);
    }, [navigate]);

    return (
        <Space>
            <Card
                title="Blackjack classic"
                cover={<img alt="Blackjack classic" src={img} />}
                hoverable
                bodyStyle={{ padding: 0 }}
                extra={<Tag color="geekblue">{Signs[currency]}5</Tag>}
                onClick={handleClick}
            ></Card>
        </Space>
    );
};
