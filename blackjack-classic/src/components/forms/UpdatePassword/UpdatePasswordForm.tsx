import { useAuthorization } from '../../../hooks';
import { PasswordInput } from '../PasswordInput';
import { ConfirmPasswordInput } from '../ConfirmPasswordInput';
import { Button, Form, Modal, Space } from 'antd';

interface UpdatePasswordForm {
    password: string;
    confirmPassword: string;
}

const validateMessages = {
    required: '${label} is required!',
};

interface Props {
    handleModal: () => void;
}

export const UpdatePasswordForm = ({ handleModal }: Props) => {
    const { updatePassword } = useAuthorization();
    const [form] = Form.useForm<UpdatePasswordForm>();

    const onSubmit = ({ password }: UpdatePasswordForm) => {
        updatePassword(password);
        form.resetFields();
        handleModal();
        Modal.success({
            content: 'Password updated successfully!',
        });
    };

    const onCancel = () => {
        form.resetFields();
        handleModal();
    };

    return (
        <Form
            size="large"
            form={form}
            name="UpdatePassword"
            onFinish={onSubmit}
            validateMessages={validateMessages}
            scrollToFirstError
        >
            <PasswordInput />
            <ConfirmPasswordInput />
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Space>
        </Form>
    );
};
