import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, Space, Typography } from 'antd';
import { SignInForm } from '../../components/forms';
import { ROUTES } from '../../constants';

export const SignInPage = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(ROUTES.SIGN_UP);
    }, [navigate]);

    return (
        <Card style={{ margin: 'auto', width: 'fit-content' }}>
            <Space direction="vertical">
                <SignInForm />
                <Typography>or</Typography>
                <Button type="link" onClick={handleClick}>
                    Create an account
                </Button>
            </Space>
        </Card>
    );
};
