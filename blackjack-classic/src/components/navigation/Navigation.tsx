import React from 'react';
import { Menu } from 'antd';
import { useUser } from '../../store';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../router/RootRouter';

export const Navigation = () => {
    const { isAuth, login } = useUser();
    
    
    return (
        <Menu theme="dark">
            {isAuth ? (
                <Menu.Item key="1">
                    <NavLink to={ROUTES.PROFILE}>{login}</NavLink>
                </Menu.Item>
            ) : (
                <Menu.Item key="3">
                    <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>
                </Menu.Item>
            )}
        </Menu>
    );
};
