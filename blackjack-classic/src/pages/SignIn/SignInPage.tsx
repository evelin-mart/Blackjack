import React, { useCallback } from 'react';
import { SignInForm } from '../../components/forms/SignIn';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../components/router/RootRouter';

export const SignInPage = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(ROUTES.SIGN_UP);
    }, [navigate]);

    return (
        <>
            <SignInForm />
            <Button type="link" onClick={handleClick}>
                Create an account
            </Button>
        </>
    );
};