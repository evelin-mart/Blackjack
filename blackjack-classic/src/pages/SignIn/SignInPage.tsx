import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'antd';
import { SignInForm } from '../../components/forms/SignIn';
import { ROUTES } from '../../constants';

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
