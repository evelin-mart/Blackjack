import React, { useEffect } from 'react';
import { authorize, useAppDispatch, useUser } from '../../store';
import { getAuthorizedUser, saveUserToLocalStorage } from '../../utils';

export const WithEventListener = <P extends JSX.IntrinsicAttributes>(
    WrappedComponent: React.ComponentType<P>,
) => {
    const WithListener = (props: P) => {
        const { balance, currency, isAuth, login } = useUser();
        const dispatch = useAppDispatch();

        useEffect(() => {
            const onUnload = () => {
                if (isAuth) {
                    saveUserToLocalStorage({ balance, currency, login });
                }
            };

            window.addEventListener('beforeunload', onUnload);

            return () => {
                window.removeEventListener('beforeunload', onUnload);
            };
        }, [balance, currency, isAuth]);

        useEffect(() => {
            const user = getAuthorizedUser();
            if (user) {
                dispatch(authorize(JSON.parse(user)));
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
    return WithListener;
};
