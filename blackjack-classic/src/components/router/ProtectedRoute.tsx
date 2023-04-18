import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useUser } from '../../store';
import { ROUTES } from '../../constants';

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuth } = useUser();
    const location = useLocation();

    if (isAuth) {
        if (location.pathname === ROUTES.SIGN_IN || location.pathname === ROUTES.SIGN_UP) {
            return <Navigate to={ROUTES.LOBBY} />;
        }
    } else if (location.pathname === ROUTES.PROFILE || location.pathname === ROUTES.LOBBY) {
        return <Navigate to={ROUTES.HOME} />;
    }

    return children;
};
