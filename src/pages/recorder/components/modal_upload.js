import React, { useState } from 'react';
import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea } from '@chakra-ui/react';

const ModalUpload = ({ onClose, isOpen, onSave }) => {

    const [validForm, setValidForm] = useState({
        isValid: false,
        error: ''
    });

    const [formData, setFormData] = useState({
        text: '',
        file: undefined
    });

    const checkValid = () => {
        if (!formData.text) {
            setValidForm(prev => ({ ...prev, isValid: false, error: 'Text không được để trống' }));
            return false;
        }
        else if (!formData.file) {
            setValidForm(prev => ({ ...prev, isValid: false, error: 'File không được để trống' }))
            return false;
        }
        else {
            setValidForm(prev => ({ ...prev, isValid: true, error: '' }))
            return true;
        }
    }

    const handleSubmit = () => {
        if (checkValid())
            onSave(formData)
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const { type } = file;

        if (type !== 'audio/wav')
            setValidForm(prev => ({ ...prev, isValid: false, error: 'Định dạng file không chính xác' }));
        else {
            setValidForm(prev => ({ ...prev, error: '' }));
            setFormData(prev => ({ ...prev, file }));
        }
    }

    return (
        <Modal
            onClose={onClose}
            //finalFocusRef={btnRef}
            size='xl'
            isOpen={isOpen}
            scrollBehavior='inside'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload file</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex display='flex' flexDir='column' gap={3}>
                        {
                            validForm.error && <Text color='red' fontSize='12'>*{validForm.error}</Text>
                        }
                        <FormControl>
                            <FormLabel>File</FormLabel>
                            <input type='file' onChange={handleChangeFile} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Text</FormLabel>
                            <Textarea
                                value={formData.text}
                                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                                placeholder='Nhập text tương ứng với audio'
                            />
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit} mr={3} colorScheme='blue'>Lưu</Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalUpload;