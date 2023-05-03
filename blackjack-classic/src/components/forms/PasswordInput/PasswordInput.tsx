import React from 'react';
import { Form, Input } from 'antd';
import { UserFormFields } from '../types';

export const PasswordInput = () => {
    return (
        <Form.Item
            name={UserFormFields.Password}
            label="Password"
            tooltip="Password must contain at least one digit, upper and lower case letters, and be at least 4 characters long"
            rules={[
                { required: true },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (
                            !value ||
                            getFieldValue(UserFormFields.Password).match(
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/,
                            )
                        ) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error('Password does not match complexity requirements'),
                        );
                    },
                }),
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>
    );
};
