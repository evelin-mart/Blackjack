import React from 'react';
import { Form, Input } from 'antd';
import { UserFormFields } from '../types';

export const ConfirmPasswordInput = () => {
    return (
        <Form.Item
            name={UserFormFields.ConfirmPassword}
            label="Confirm Password"
            dependencies={[UserFormFields.Password]}
            hasFeedback
            rules={[
                { required: true },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue(UserFormFields.Password) === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Password mismatch!'));
                    },
                }),
            ]}
        >
            <Input.Password />
        </Form.Item>
    );
};
