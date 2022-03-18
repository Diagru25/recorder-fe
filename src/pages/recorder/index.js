import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Text, Select, useToast } from '@chakra-ui/react';
import { BsArrowLeftShort, BsMic, BsSquare } from 'react-icons/bs';
import brg from '../../assets/images/bgr.png';
import { useHistory } from 'react-router-dom';
import { GENDER, AREA, AGE } from '../../constants/format.constants';
import fileApi from '../../services/api/fileApi';
import suggestApi from '../..//services/api/suggestApi';
import { OutLineButton } from '../../components/outline_button';
import { log } from '../../helpers/log';

URL = window.URL || window.webkitURL;

let gumStream; 						//stream from getUserMedia()
let rec; 							//Recorder.js object
let input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext //audio context to help us record

export const Recorder = () => {

    const toast = useToast();
    const history = useHistory();
    const [isRecording, setIsRecording] = useState(false);
    const [recordList, setRecordList] = useState([]);
    const [formData, setFormData] = useState({
        gender: '',
        area: '',
        age: ''
    });
    const [step, setStep] = useState(0);
    const [textList, setTextList] = useState([]);

    useEffect(() => {
        const getRandomSentence = async () => {
            try {
                const res = await suggestApi.getRandomSentence();
                const convertData = res.data.map((item) => item.text)
                setTextList(convertData);
            }
            catch (error) {
                log('[GET RANDOM TEXT]: ', error);
            }
        }

        getRandomSentence();
    }, [])

    const handleRecord = () => {
        setIsRecording(!isRecording);

        if (isRecording)
            stopRecording();
        else
            startRecording();
    }

    const handleBack = () => {
        history.goBack();
    }

    const startRecording = () => {
        let constraints = { audio: true, video: false }

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {

            audioContext = new AudioContext();

            gumStream = stream;

            /* use the stream */
            input = audioContext.createMediaStreamSource(stream);
            rec = new window.Recorder(input, { numChannels: 1 })

            //start the recording process
            rec.record()
        }).catch(function (err) {
            console.log(err);
            setIsRecording(false);
        });
    }

    const stopRecording = () => {
        rec.stop();

        //stop microphone access
        gumStream.getAudioTracks()[0].stop();

        rec.exportWAV(createDownloadLink);
    }

    const createDownloadLink = (blob) => {
        let url = URL.createObjectURL(blob);
        const record = {
            url: url,
            blob: blob
        }
        const recordListClone = [...recordList];
        const stepItem = recordListClone[step];

        if (stepItem)
            recordListClone[step] = record;
        else
            recordListClone.push(record);

        setRecordList(recordListClone);
        setStep(step < 4 ? step + 1 : 4);
    };

    const handleSubmit = async () => {

        // console.log('recordList: ', recordList);
        // console.log('textDemo: ', textDemo);
        // console.log('formData: ', formData);
        const recordListClone = [...recordList].map((item) => item.blob);
        const textListClone = [...textList];
        try {
            const res = await fileApi.uploadFile(recordListClone, textListClone, formData);
            if (res.statusCode === 201) {
                toast({
                    title: 'Tải lên thành công',
                    description: "Chân thành cảm ơn sự đóng góp của bạn!",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                handleRefresh();
            }
        }
        catch (err) {
            toast({
                title: 'Lỗi',
                description: err.data.message.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }

    }

    const handleRefresh = () => {
        setIsRecording(false);
        setFormData({
            area: '',
            gender: '',
            age: ''
        })
        setRecordList([]);
        setStep(0);
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
                <Box>
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
                </Box>
                <Flex flexDir='column'>
                    <Flex >
                        <Flex
                            flexDir='column'
                            flex={1}
                            pt={3}
                            justifyContent='center'
                            alignItems='flex-start'
                            gap={3}
                        >
                            <Select
                                placeholder='Giới tính'
                                maxW='300px'
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value={GENDER.MALE}>Nam</option>
                                <option value={GENDER.FEMALE}>Nữ</option>
                            </Select>
                            <Select
                                placeholder='Vùng miền'
                                maxW='300px'
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            >
                                <option value={AREA.NORTH}>Miền bắc</option>
                                <option value={AREA.CENTRAL}>Miền trung</option>
                                <option value={AREA.SOUTH}>Miền nam</option>
                            </Select>
                            <Select
                                placeholder='Độ tuổi'
                                maxW='300px'
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            >
                                <option value={AGE.AGE_UNDER}>{AGE.AGE_UNDER}</option>
                                <option value={AGE.AGE_2X}>{AGE.AGE_2X}</option>
                                <option value={AGE.AGE_3X}>{AGE.AGE_3X}</option>
                                <option value={AGE.AGE_4X}>{AGE.AGE_4X}</option>
                                <option value={AGE.AGE_5X}>{AGE.AGE_5X}</option>
                                <option value={AGE.AGE_6X}>{AGE.AGE_6X}</option>
                                <option value={AGE.AGE_7X}>{AGE.AGE_7X}</option>
                                <option value={AGE.AGE_8X}>{AGE.AGE_8X}</option>
                                <option value={AGE.AGE_9X}>{AGE.AGE_9X}</option>
                                <option value={AGE.AGE_UPPER}>{AGE.AGE_UPPER}</option>
                            </Select>
                        </Flex>
                        <Flex flexDir='column' maxW='60%'>
                            <Flex
                                justifyContent='center'
                                color='#4a4a4a'
                                fontStyle='italic'
                                m='28px 0'
                            >
                                <Text>Hãy nhấn</Text>
                                <Icon as={BsMic} w={6} h={6} color='#ff4f5e' mx={1} />
                                <Text>và đọc câu dưới đây</Text>
                            </Flex>
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
                                    {textList[step]}
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
                            {
                                recordList.length > 0 &&
                                recordList.map((item, index) => <audio key={index} controls src={item.url} />)
                            }
                        </Flex>
                    </Flex>
                    <Flex justifyContent='center' gap={3} mt={4}>
                        {
                            [0, 1, 2, 3, 4].map((item, index) => <OutLineButton
                                key={index}
                                text={item + 1}
                                isDisabled={item > recordList.length ? true : false}
                                isSelected={step === item ? true : false}
                                onClick={() => setStep(item)}
                                style={{
                                    padding: '0',
                                    width: '40px',
                                    height: '40px'
                                }}
                            />)
                        }

                    </Flex>
                </Flex>

                <Flex
                    justifyContent='center'
                    mt='70px'
                    backgroundImage={brg}
                    backgroundSize='contain'
                    backgroundRepeat='no-repeat'
                    backgroundPosition='center'
                >
                    <Flex
                        w='88px'
                        h='88px'
                        border='none'
                        borderRadius='50%'
                        alignItems='center'
                        justifyContent='center'
                        backgroundColor='white'
                        marginX='40px'
                        transition='0.5s'
                        _hover={{
                            cursor: 'pointer',
                            transform: 'scale(0.8)'
                        }}

                        onClick={handleRecord}
                    >
                        <Flex
                            w='88px'
                            h='88px'
                            border='none'
                            borderRadius='50%'
                            alignItems='center'
                            justifyContent='center'
                            backgroundColor='white'
                            zIndex={50}
                        >
                            <Icon as={isRecording ? BsSquare : BsMic} w={8} h={8} color='#ff4f5e' />
                        </Flex>
                        <Box
                            w='100px'
                            h='100px'
                            m={0}
                            borderRadius='50%'
                            background='linear-gradient(90deg,#f89096,#b1b4e5)'
                            position='absolute'
                            filter='blur(7.6px)'
                            opacity='0.6'
                        >
                        </Box>
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between'>
                    <OutLineButton
                        text='Làm mới'
                        onClick={handleRefresh}
                    />
                    <OutLineButton
                        text='Gửi lên'
                        isDisabled={recordList.length > 0 ? false : true}
                        onClick={handleSubmit}
                    />
                </Flex>
            </Flex>
        </Box>
    )
}