import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, 
    Flex, 
    IconButton, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    NumberInput, 
    NumberInputField, 
    Select } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { iconApi, locationApi } from '../../../services/api';

export const ModalCreate = ({ onClose, isOpen, onSave }) => {

    const groupDefault = {
        icon_id: '',
        location_id: '',
        quantity: 0
    };

    const [formFields, setFormFields] = useState([groupDefault]);
    const [iconList, setIconList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchSelectData = async () => {
            let [icons, locations] = await Promise.all([
                await iconApi.getAll(),
                await locationApi.getAll()
            ]);

            setIconList(icons.data);
            setLocationList(locations.data);
        }

        fetchSelectData();
    }, [])


    const handleAddFormFields = () => {
        let cloneFormFields = [...formFields];
        cloneFormFields.push(groupDefault);
        setFormFields(cloneFormFields);
    }

    const handleRemoveFormFields = (index) => {
        let cloneFormFields = [...formFields];
        cloneFormFields.splice(index, 1);
        setFormFields(cloneFormFields);
    }

    const handleSubmit = () => {
        let dataSubmit = {
            name,
            formFields
        }
        onSave(dataSubmit);
    }

    const handleOnChangeForm = (index, data) => {
        let cloneFormFields = [...formFields];
        let indexObj = cloneFormFields[index];

        const newObj = { ...indexObj, ...data };
        cloneFormFields[index] = newObj;
        setFormFields(cloneFormFields);
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
                <ModalHeader>Thêm báo cáo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex display='flex' flexDir='column' gap={3}>
                        <Input size='sm' placeholder='Tên báo cáo' value={name} onChange={(e) => setName(e.target.value)} />
                        {
                            formFields.map((item, index) => {
                                let keys = Object.keys(item);
                                return (
                                    <Flex key={index} gap={2}>
                                        <Select
                                            flex={2}
                                            placeholder='vị trí'
                                            size='sm'
                                            value={item[keys[1]]}
                                            onChange={(e) => handleOnChangeForm(index, { location_id: e.target.value })}
                                        >
                                            {locationList.map((location, index) => (
                                                <option key={index} value={location._id}>{location.name}</option>
                                            ))}
                                        </Select>
                                        <Select
                                            flex={2}
                                            placeholder='icon'
                                            size='sm'
                                            value={item[keys[0]]}
                                            onChange={(e) => handleOnChangeForm(index, { icon_id: e.target.value })}
                                        >
                                            {iconList.map((icon, index) => (
                                                <option key={index} value={icon._id}>{icon.name}</option>
                                            ))}
                                        </Select>
                                        <NumberInput
                                            flex={1}
                                            size='sm'
                                            value={item[keys[2]]}
                                            onChange={(value) => handleOnChangeForm(index, { quantity: Number(value) })}
                                        >
                                            <NumberInputField placeholder='Số lượng' />
                                        </NumberInput>
                                        <IconButton icon={<MinusIcon />} size='sm' variant='outline' colorScheme='red' onClick={() => handleRemoveFormFields(index)} />
                                    </Flex>
                                )
                            })
                        }
                    </Flex>
                    <IconButton size='sm' mt={3} variant='outline' icon={<AddIcon />} w='100%' colorScheme='facebook' onClick={handleAddFormFields} />

                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit} mr={3} colorScheme='blue'>Lưu</Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}