import React from 'react';

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';


export const ConfirmModal = ({ isOpen, content = 'Bạn có chắc chắn muốn xóa bản ghi này?', onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Xác nhận</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {content}
                </ModalBody>

                <ModalFooter>
                    <Button variant='outline' colorScheme='red' mr={3} onClick={onClose}>
                        Hủy
                    </Button>
                    <Button colorScheme='teal' onClick={onConfirm}>
                        Xác nhận
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}