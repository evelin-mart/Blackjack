import { useAuthorization } from '../../../hooks';
import { UserFormFields } from '../types';
import { PasswordInput } from '../PasswordInput';
import { Button, Form, Input } from 'antd';
import { ConfirmPasswordInput } from '../ConfirmPasswordInput';

interface UpdatePasswordForm {
    password: string;
    confirmPassword: string;
}

const validateMessages = {
    required: '${label} is required!',
};

export const UpdatePasswordForm = () => {
    const { updatePassword } = useAuthorization();
    const [form] = Form.useForm<UpdatePasswordForm>();

    const onSubmit = ({ password }: UpdatePasswordForm) => {
        updatePassword(password);
    };

    return (
        <Form
            size="large"
            form={form}
            name="register"
            onFinish={onSubmit}
            validateMessages={validateMessages}
            scrollToFirstError
        >
            <PasswordInput />
            <ConfirmPasswordInput />
            <Button type="primary" htmlType="submit">
                Update
            </Button>
        </Form>
    );
};
