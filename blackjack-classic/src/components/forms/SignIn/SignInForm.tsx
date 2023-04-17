import { useAuthorization } from '../../../hooks/authorization';
import { Button, Form, Input } from 'antd';
import { UserFormFields } from '../types';

interface SignInForm {
    login: string;
    password: string;
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

export const SignInForm = () => {
    const { login } = useAuthorization();
    const [form] = Form.useForm<SignInForm>();

    const onSubmit = (values: SignInForm) => {
        try {
            login(values);
        } catch (e) {
            form.setFields([
                {
                    name: UserFormFields.Login,
                    errors: [(e as Error).message],
                },
            ]);
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="login"
            onFinish={onSubmit}
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
                                getFieldValue(UserFormFields.Login).match(/^[a-zA-Z0-9_-]{3,16}$/)
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

            <Button type="primary" htmlType="submit">
                Sign In
            </Button>
        </Form>
    );
};
