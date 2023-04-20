import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { UpdatePasswordForm } from '../../forms';

export const UpdatePasswordModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Update Password
            </Button>
            <Modal
                title="Update Password"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <UpdatePasswordForm />
            </Modal>
        </>
    );
};
