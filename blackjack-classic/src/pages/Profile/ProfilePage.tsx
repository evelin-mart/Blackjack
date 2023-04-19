import React, { useCallback, useMemo } from 'react';
import { Button, Card } from 'antd';
import { useAppDispatch, useUser } from '../../store';
import { Currencies, Signs } from '../../constants';
import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { changeCurrency } from '../../store/user';
import { Key } from 'antd/es/table/interface';

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
    const { balance, currency } = useUser();
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

    const onCurrencyChange = useCallback((value: Key[]) => {
        dispatch(changeCurrency(value[0] as Currencies));
    }, []);

    return (
        <Card size="small" style={{ margin: 'auto', width: 'fit-content' }}>
            <h2>Your balance:</h2>
            <Table
                rowSelection={{
                    type: 'radio',
                    defaultSelectedRowKeys: [currency],
                    onChange: onCurrencyChange,
                }}
                columns={columns}
                dataSource={data}
            />
            {currency}
            <Button type="link">Top Up</Button>
        </Card>
    );
};
