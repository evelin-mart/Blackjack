import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { SignUpForm } from '../../components/forms';
import { Button, Card, Space, Typography } from 'antd';
import { ROUTES } from '../../constants';

export const SignUpPage = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(ROUTES.SIGN_IN);
    }, [navigate]);

    return (
        <Card style={{ margin: 'auto', width: 'fit-content' }}>
            <Space direction="vertical">
                <SignUpForm />
                <Typography>or</Typography>
                <Button type="link" onClick={handleClick}>
                    Sign in
                </Button>
            </Space>
        </Card>
    );
};
