import React from 'react';
import { Form, Input } from 'antd';
import { UserFormFields } from '../types';

export const LoginInput = () => {
    return (
        <Form.Item
            name={UserFormFields.Login}
            label="Login"
            tooltip='Login can contain from 3 to 16 characters, including "_", "-"'
            rules={[
                { required: true },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (
                            !value ||
                            getFieldValue(UserFormFields.Login).match(/^[a-zA-Z0-9_-]{3,16}$/)
                        ) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error('Login doesn\'t match the rules'),
                        );
                    },
                }),
            ]}
        >
            <Input />
        </Form.Item>
    );
};
