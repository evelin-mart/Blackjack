import { Currencies } from '../../../constants/currencies';
import { getUserFromLocalStorage } from '../../../utils/localStorage';
import { useAuthorization } from '../../../hooks/authorization';
import { Button, Select, Form, Input } from 'antd';
import { UserFormFields } from '../types';
import { LoginInput } from '../LoginInput';
import { PasswordInput } from '../PasswordInput';

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
