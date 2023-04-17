import React, { useMemo } from 'react';
import { Menu, MenuProps } from 'antd';
import { SettingOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useAppDispatch, useUser } from '../../store';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { logout } from '../../store/user';

const unAuthItems: MenuProps['items'] = [
    {
        key: '1',
        label: <NavLink to={ROUTES.HOME}>Main Page</NavLink>,
    },
    {
        key: '2',
        label: <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>,
        icon: <LoginOutlined />,
        style: { marginLeft: 'auto' },
    },
];

export const Navigation = () => {
    const { isAuth, login } = useUser();
    const dispatch = useAppDispatch();

    const authItems: MenuProps['items'] = useMemo(() => {
        return [
            {
                key: '1',
                label: <NavLink to={ROUTES.HOME}>Main Page</NavLink>,
            },
            {
                key: '2',
                label: <NavLink to={ROUTES.LOBBY}>Lobby</NavLink>,
                style: { margin: 'auto' },
            },
            {
                key: '3',
                label: login,
                icon: <UserOutlined />,
                children: [
                    {
                        key: '4',
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

    return <Menu theme="dark" mode="horizontal" items={isAuth ? authItems : unAuthItems} />;
};
