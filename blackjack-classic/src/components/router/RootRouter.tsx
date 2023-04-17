import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { SignInPage } from '../../pages/SignIn';
import { SignUpPage } from '../../pages/SignUp';
import { HomePage } from '../../pages/Home';
import { ProfilePage } from '../../pages/Profile';
import { GamePage } from '../../pages/Game';
import { PageLayout } from '../layout';

export enum ROUTES {
    HOME = '/',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    PROFILE = '/profile',
    GAME = '/blackjack-classic',
    NOT_FOUND = '/not-found',
}

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
                    <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
                    <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
                    <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Route>
                <Route path={ROUTES.GAME} element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    );
};
