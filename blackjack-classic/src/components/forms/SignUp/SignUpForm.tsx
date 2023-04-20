import { Currencies } from '../../../constants/currencies';
import { getUserFromLocalStorage } from '../../../utils';
import { useAuthorization } from '../../../hooks';
import { UserFormFields } from '../types';
import { LoginInput } from '../LoginInput';
import { PasswordInput } from '../PasswordInput';
import { Button, Select, Form } from 'antd';
import { ConfirmPasswordInput } from '../ConfirmPasswordInput';

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

    const onSubmit = ({ login, password, currency }: SignUpForm) => {
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
        }
    };

    return (
        <Form
            size="large"
            form={form}
            name="register"
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
