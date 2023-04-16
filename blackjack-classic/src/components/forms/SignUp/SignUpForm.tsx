import { Currencies } from '../../../constants/currencies';
import { getUserFromLocalStorage } from '../../../utils/localStorage';
import { useAuthorization } from '../../../hooks/authorization';
import { Button, Select, Form, Input } from 'antd';
import { UserFormFields } from '../types';

interface SignUpForm {
    login: string;
    password: string;
    confirmPassword: string;
    currency: Currencies;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

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
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onSubmit}
            initialValues={{ [UserFormFields.Currency]: Currencies.EUR }}
            validateMessages={validateMessages}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name={UserFormFields.Login}
                label="Login"
                rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                !value ||
                                getFieldValue(UserFormFields.Login).match(/^[a-z0-9_-]{3,16}$/)
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('Login must contain 3-16 characters except symbols!'),
                            );
                        },
                    }),
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={UserFormFields.Password}
                label="Password"
                rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                !value ||
                                getFieldValue(UserFormFields.Password).match(
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,12}$/,
                                )
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(
                                    'Password must contain digits, uppercase and lowercase letters!',
                                ),
                            );
                        },
                    }),
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
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
                            return Promise.reject(
                                new Error('The two passwords that you entered do not match!'),
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name={UserFormFields.Currency} label="Currency" rules={[{ required: true }]}>
                <Select
                    options={[
                        { value: Currencies.USD, label: Currencies.USD },
                        { value: Currencies.EUR, label: Currencies.EUR },
                        { value: Currencies.GBP, label: Currencies.GBP },
                    ]}
                />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Sign Up
            </Button>
        </Form>
    );
};
