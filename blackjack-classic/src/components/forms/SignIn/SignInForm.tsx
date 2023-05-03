import { useAuthorization } from '../../../hooks/authorization';
import { Button, Form } from 'antd';
import { UserFormFields } from '../types';
import { LoginInput } from '../LoginInput';
import { PasswordInput } from '../PasswordInput';

interface SignInForm {
    login: string;
    password: string;
}

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
            size="large"
            form={form}
            name="SignIn"
            onFinish={onSubmit}
            validateMessages={validateMessages}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <LoginInput />
            <PasswordInput />
            <Button type="primary" htmlType="submit">
                Sign In
            </Button>
        </Form>
    );
};
