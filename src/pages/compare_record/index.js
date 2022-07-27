import { Box, Flex, Icon, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { OutLineButton } from '../../components/outline_button';
import { useActions } from '../../redux/useActions';

export const CompareRecord = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recordActions } = useActions();
    const [step, setStep] = useState(0);
    const [text, setText] = useState('');

    const recordCompareList = useSelector(state => state.recordReducer.recordCompareList);
    const updateCompareList = useSelector(state => state.recordReducer.updateCompareList);

    useEffect(() => {
        dispatch(recordActions.actions.getRecordCompare());
    }, [dispatch, recordActions.actions])

    const handleBack = () => {
        history.goBack();
    }

    const handleStepChange = (item) => {
        const isExited = updateCompareList.length - 1 >= item ? true : false;
        // console.log(updateCompareList.length, item);
        if (isExited) {
            console.log(item);
            setText(updateCompareList[item].text);
        }
        else
            setText('');
        setStep(item);
    }

    const handleChangeText = (e) => {
        const value = e.target.value;
        const cloneData = [...updateCompareList];
        const { _id } = recordCompareList[step];

        const foundIndex = cloneData.findIndex(el => el._id === _id);

        //item = 1; length = 2;
        if (foundIndex !== -1) {
            cloneData[foundIndex].text = value;
        }
        else {
            cloneData.push({
                _id,
                value
            });
        }

        setText(value);
        // console.log('updated compare: ', cloneData);
        dispatch(recordActions.actions.updateState({ updateCompareList: cloneData }));
    }

    const handleSubmit = () => {
        dispatch(recordActions.actions.updateRecordCompare(updateCompareList));
    }

    return (
        <Box
            backgroundImage='linear-gradient(0deg,#fff 20%,#f3f2f1)'
            w='100%'
            h='100%'
        >
            <Flex
                flexDir='column'
                margin='0 auto'
                maxW='1400px'
                p='20px'
                h='100%'
                justifyContent='space-between'
            >
                <Flex
                    h='100%'
                    flexDir='column'
                    justifyContent='space-around'
                >
                    <Flex
                        w='57px'
                        h='57px'
                        backgroundColor='white'
                        border='none'
                        borderRadius='50%'
                        alignItems='center'
                        justifyContent='center'
                        transition='0.5s'
                        boxShadow='0 2px 4px 0 rgb(0 0 0 / 9%)'
                        _hover={{
                            cursor: 'pointer',
                            transform: 'scale(0.9)',
                        }}

                        onClick={handleBack}
                    >
                        <Icon as={BsArrowLeftShort} w={8} h={8} />
                    </Flex>
                    <Flex>
                        <Flex
                            flexDir='column'
                            flex={1}
                            pt={3}
                            justifyContent='center'
                            alignItems='flex-start'
                            gap={3}
                        >
                            <Text align='center' fontWeight='bold'>Chỉnh sửa</Text>
                            <Textarea
                                value={text}
                                onChange={handleChangeText}
                                rows="5"
                                placeholder='Chỉnh sửa đúng với câu từ'

                            />
                        </Flex>
                        <Flex flexDir='column' maxW='60%'>
                            <Box
                                p='100px 100px'
                                mx={3}
                                backgroundColor='white'
                                maxW='700px'
                                boxShadow='0 6px 12px 0 rgb(0 0 0 / 5%)'
                            >
                                <Text
                                    fontSize={32}
                                    textAlign='center'
                                >

                                    {recordCompareList.length > 0 && recordCompareList[step].text}

                                </Text>
                            </Box>
                        </Flex>

                        <Flex
                            flexDir='column'
                            flex={1}
                            pt={3}
                            justifyContent='center'
                            alignItems='flex-end'
                            gap={3}
                        >

                            {recordCompareList.length > 0 &&
                                <audio controls src={`${process.env.REACT_APP_BASE_URL}/v1/resources/get_file/?filename=${recordCompareList[step].audio}`}></audio>
                            }
                        </Flex>

                    </Flex>
                    <Flex justifyContent='center' gap={3} mt={4}>
                        {
                            [0, 1, 2, 3, 4].map((item, index) => <OutLineButton
                                key={index}
                                text={item + 1}
                                isDisabled={item + 1 > recordCompareList.length ? true : false}
                                isSelected={step === item ? true : false}
                                onClick={() => handleStepChange(item)}
                                style={{
                                    padding: '0',
                                    width: '40px',
                                    height: '40px'
                                }}
                            />)
                        }
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between'>

                    <OutLineButton
                        text='Gửi lên'
                        //isDisabled={recordList.length > 0 ? false : true}
                        onClick={handleSubmit}
                    />
                </Flex>
            </Flex>
        </Box>
    )
}