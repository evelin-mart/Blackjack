import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { SignInPage, GamePage, HomePage, LobbyPage, ProfilePage, SignUpPage } from '../../pages';
import { PageLayout } from '../layout';
import { ROUTES } from '../../constants';
import { ProtectedRoute } from './ProtectedRoute';

export const RootRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTES.HOME}
                    element={
                        <>
                            <PageLayout>
                                <Outlet />
                            </PageLayout>
                            {/* <Modal /> */}
                        </>
                    }
                >
                    <Route index element={<HomePage />} />
                    <Route
                        path={ROUTES.PROFILE}
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.LOBBY}
                        element={
                            <ProtectedRoute>
                                <LobbyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.SIGN_UP}
                        element={
                            <ProtectedRoute>
                                <SignUpPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.SIGN_IN}
                        element={
                            <ProtectedRoute>
                                <SignInPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
                </Route>
                <Route path={ROUTES.GAME} element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    );
};
