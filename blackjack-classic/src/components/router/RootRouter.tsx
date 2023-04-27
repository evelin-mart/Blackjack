import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { SignInPage, GamePage, HomePage, LobbyPage, ProfilePage, SignUpPage } from '../../pages';
import { PageLayout } from '../layout';
import { ROUTES } from '../../constants';
import { ProtectedRoute } from './ProtectedRoute';
import { WithEventListener } from '../../hocs';

const RootRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTES.HOME}
                    element={
                        <ProtectedRoute>
                            <PageLayout>
                                <Outlet />
                            </PageLayout>
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<HomePage />} />
                    <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                    <Route path={ROUTES.LOBBY} element={<LobbyPage />} />
                    <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
                    <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
                    <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
                </Route>
                <Route
                    path={ROUTES.GAME}
                    element={
                        <ProtectedRoute>
                            <GamePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export const RouterWithListener = WithEventListener(RootRouter);
