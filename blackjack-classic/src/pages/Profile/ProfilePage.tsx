import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useUser, addBalance, changeCurrency, logout } from '../../store';
import { UpdatePasswordModal } from '../../components/modals';
import { Currencies } from '../../constants';
import { Button, Card, Divider, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key } from 'antd/es/table/interface';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { deleteUser } from '../../utils';

interface DataType {
    key: React.Key;
    currency: string;
    balance: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Currency',
        dataIndex: 'currency',
    },
    {
        title: 'Balance',
        dataIndex: 'balance',
    },
];

export const ProfilePage = () => {
    const { balance, currency, login } = useUser();
    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        return [
            {
                key: Currencies.EUR,
                currency: Currencies.EUR,
                balance: balance.EUR,
            },
            {
                key: Currencies.GBP,
                currency: Currencies.GBP,
                balance: balance.GBP,
            },
            {
                key: Currencies.USD,
                currency: Currencies.USD,
                balance: balance.USD,
            },
        ];
    }, [balance]);

    const onCurrencyChange = useCallback(
        (value: Key[]) => {
            dispatch(changeCurrency(value[0] as Currencies));
        },
        [dispatch],
    );

    const onTopUpBalance = useCallback(() => {
        dispatch(addBalance(50));
    }, [dispatch]);

    const onDeleteAccount = useCallback(() => {
        Modal.confirm({
            title: 'Are you sure want to delete account?',
            icon: <ExclamationCircleFilled />,
            content: 'You will lose your money',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(logout());
                deleteUser(login);
            },
        });
    }, []);

    return (
        <Card size="small" style={{ margin: 'auto', width: 'fit-content' }}>
            <h2>Your balance:</h2>
            <Table
                style={{ width: 300, margin: 'auto' }}
                rowSelection={{
                    type: 'radio',
                    defaultSelectedRowKeys: [currency],
                    onChange: onCurrencyChange,
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <Space>
                <h4>Current: {currency}</h4>
                <Button icon={<PlusOutlined />} onClick={onTopUpBalance}>
                    Top Up
                </Button>
            </Space>
            <Divider />
            <UpdatePasswordModal />
            <p>or</p>
            <Button danger onClick={onDeleteAccount}>
                Delete account
            </Button>
        </Card>
    );
};
