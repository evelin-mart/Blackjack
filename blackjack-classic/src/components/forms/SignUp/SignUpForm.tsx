import { Currencies, Signs, registrationBonus } from '../../../constants';
import { getUserFromLocalStorage } from '../../../utils';
import { useAuthorization } from '../../../hooks';
import { UserFormFields } from '../types';
import { LoginInput } from '../LoginInput';
import { PasswordInput } from '../PasswordInput';
import { Button, Select, Form, Modal } from 'antd';
import { ConfirmPasswordInput } from '../ConfirmPasswordInput';
import { useCallback } from 'react';

interface SignUpForm {
    login: string;
    password: string;
    confirmPassword: string;
    currency: Currencies;
}

const validateMessages = {
    required: '${label} is required!',
};

export const SignUpForm = () => {
    const { registerUser } = useAuthorization();
    const [form] = Form.useForm<SignUpForm>();

    const onSubmit = useCallback(
        ({ login, password, currency }: SignUpForm) => {
            if (getUserFromLocalStorage(login)) {
                form.setFields([
                    {
                        name: UserFormFields.Login,
                        errors: ['User already exists!'],
                    },
                ]);
                return;
            } else {
                registerUser({ login, password }, currency);
                Modal.success({
                    title: 'You get a signup bonus!',
                    content: `${Signs[currency]}${registrationBonus}`,
                });
            }
        },
        [form, registerUser],
    );

    return (
        <Form
            size="large"
            form={form}
            name="SignUp"
            onFinish={onSubmit}
            initialValues={{ [UserFormFields.Currency]: Currencies.EUR }}
            validateMessages={validateMessages}
            scrollToFirstError
        >
            <LoginInput />
            <PasswordInput />
            <ConfirmPasswordInput />
            <Form.Item
                name={UserFormFields.Currency}
                label="Currency"
                style={{ maxWidth: 170 }}
                rules={[{ required: true }]}
            >
                <Select
                    options={[
                        { value: Currencies.USD, label: `$ ${Currencies.USD}` },
                        { value: Currencies.EUR, label: `€ ${Currencies.EUR}` },
                        { value: Currencies.GBP, label: `£ ${Currencies.GBP}` },
                    ]}
                />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Sign Up
            </Button>
        </Form>
    );
};
