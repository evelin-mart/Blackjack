import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useUser } from '../../store';
import { ROUTES } from '../../constants';

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuth } = useUser();
    const { pathname } = useLocation();

    if (isAuth) {
        if (pathname === ROUTES.SIGN_IN || pathname === ROUTES.SIGN_UP) {
            return <Navigate to={ROUTES.LOBBY} />;
        }
    } else if (
        pathname === ROUTES.PROFILE ||
        pathname === ROUTES.LOBBY ||
        pathname === ROUTES.GAME
    ) {
        return <Navigate to={ROUTES.HOME} />;
    }

    return children;
};
