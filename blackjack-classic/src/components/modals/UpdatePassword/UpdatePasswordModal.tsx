import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import { UpdatePasswordForm } from '../../forms';

export const UpdatePasswordModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Update Password
            </Button>
            <Modal title="Update Password" footer={false} open={isModalOpen} onCancel={handleClose}>
                <UpdatePasswordForm handleModal={handleClose} />
            </Modal>
        </>
    );
};
