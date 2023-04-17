import React, { useCallback } from 'react';
import { SignUpForm } from '../../components/forms/SignUp';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../components/router/RootRouter';

export const SignUpPage = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(ROUTES.SIGN_IN);
    }, [navigate]);

    return (
        <>
            <SignUpForm />
            <Button type="link" onClick={handleClick}>
                I have an account
            </Button>
        </>
    );
};
