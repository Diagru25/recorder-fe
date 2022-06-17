import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { iconApi, locationApi } from '../../../services/api';

export const ModalCreate = ({ onClose, isOpen }) => {

    const groupDefault = {
        icon_id: '',
        location_id: ''
    };

    const [formFields, setFormFields] = useState([groupDefault]);
    const [iconList, setIconList] = useState([]);
    const [locationList, setLocationList] = useState([]);

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
            formFields
        }

        console.log(dataSubmit);
    }

    const handleOnChangeForm = (index, data) => {
        let cloneFormFields = [...formFields];
        let indexObj = cloneFormFields[index];
        const newObj = {...indexObj, ...data};
        console.log(newObj);
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
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex display='flex' flexDir='column' gap={3}>
                        {
                            formFields.map((item, index) => {
                                let keys = Object.keys(item);
                                return (
                                    <Flex key={index} gap={2}>
                                        <Select
                                            placeholder='icon'
                                            size='sm'
                                            value={item[keys[0]]}
                                            onChange={(e) => handleOnChangeForm(index, {icon_id: e.target.value})}
                                        >
                                            {iconList.map((icon, index) => (
                                                <option key={index} value={icon._id}>{icon.name}</option>
                                            ))}
                                        </Select>
                                        <Select
                                            placeholder='location'
                                            size='sm'
                                            value={item[keys[1]]}
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            {locationList.map((location, index) => (
                                                <option key={index} value={location._id}>{location.name}</option>
                                            ))}
                                        </Select>
                                        <IconButton icon={<MinusIcon />} size='sm' variant='outline' colorScheme='red' onClick={() => handleRemoveFormFields(index)} />
                                    </Flex>
                                )
                            })
                        }
                    </Flex>
                    <IconButton mt={3} variant='outline' icon={<AddIcon />} w='100%' colorScheme='facebook' onClick={handleAddFormFields} />

                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Lưu</Button>
                    <Button onClick={onClose}>Đóng</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}