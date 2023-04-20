import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useUser, logout } from '../../store';
import { ROUTES } from '../../constants';
import { Menu, MenuProps } from 'antd';
import { SettingOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';

const unAuthItems: MenuProps['items'] = [
    {
        key: ROUTES.HOME,
        label: <NavLink to={ROUTES.HOME}>Main Page</NavLink>,
    },
    {
        key: ROUTES.SIGN_IN,
        label: <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>,
        icon: <LoginOutlined />,
        style: { marginLeft: 'auto' },
    },
];

export const Navigation = () => {
    const { isAuth, login } = useUser();
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const authItems: MenuProps['items'] = useMemo(() => {
        return [
            {
                key: ROUTES.HOME,
                label: <NavLink to={ROUTES.HOME}>Main Page</NavLink>,
            },
            {
                key: ROUTES.LOBBY,
                label: <NavLink to={ROUTES.LOBBY}>Lobby</NavLink>,
                style: { margin: 'auto' },
            },
            {
                key: '3',
                label: login,
                icon: <UserOutlined />,
                children: [
                    {
                        key: ROUTES.PROFILE,
                        icon: <SettingOutlined />,
                        label: <NavLink to={ROUTES.PROFILE}>Profile</NavLink>,
                    },
                    {
                        key: '5',
                        icon: <LogoutOutlined />,
                        label: 'Logout',
                        onClick: () => {
                            dispatch(logout());
                        },
                    },
                ],
            },
        ];
    }, [login, dispatch]);

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname, pathname === ROUTES.SIGN_UP ? ROUTES.SIGN_IN : '']}
            items={isAuth ? authItems : unAuthItems}
        />
    );
};
