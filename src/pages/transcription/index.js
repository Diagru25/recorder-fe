import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { BsArrowLeftShort, BsMic, BsSquare } from 'react-icons/bs';
import brg from '../../assets/images/bgr.png';
import { useHistory } from 'react-router-dom';
import { OutLineButton } from '../../components/outline_button';
import { log } from '../../helpers/log';
import transcriptionApi from '../../services/api/transcriptionApi';

URL = window.URL || window.webkitURL;

let gumStream; 						//stream from getUserMedia()
let rec; 							//Recorder.js object
let input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext //audio context to help us record

export const Transcription = () => {

    const toast = useToast();
    const history = useHistory();
    const [isRecording, setIsRecording] = useState(false);
    const [record, setRecord] = useState({
        url: '',
        blob: ''
    });
    const [textResult, setTextResult] = useState(`"Sau khi thu âm, hệ thống sẽ xử lý dữ liệu và hiển thị lên màn hình này"`);

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

        setRecord(record);
    };

    const handleSubmit = async () => {
        try {
            const res = await transcriptionApi.transcription(record.blob);

            // if (res.statusCode === 201) {
            //     toast({
            //         title: 'Nhận dạng thành công',
            //         description: "",
            //         status: 'success',
            //         duration: 5000,
            //         isClosable: true,
            //     });
            // }
            console.log(res);
            setTextResult(res.text)

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
        // setIsRecording(false);
        // setFormData({
        //     area: '',
        //     gender: '',
        //     age: ''
        // })
        // setRecordList([]);
        // setStep(0);
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
                <Flex flexDir='column' alignItems='center'>
                    <Flex flexDir='column' maxW='60%' mb={4}>
                        <Flex
                            justifyContent='center'
                            color='#4a4a4a'
                            fontStyle='italic'
                            m='28px 0'
                        >
                            <Text>Hãy nhấn</Text>
                            <Icon as={BsMic} w={6} h={6} color='#ff4f5e' mx={1} />
                            <Text>để tiến hành thu âm</Text>
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
                                {textResult}
                            </Text>
                        </Box>
                    </Flex>
                    {
                        record.url && <audio controls src={record.url} />
                    }

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
                        //isDisabled={recordList.length > 0 ? false : true}
                        onClick={handleSubmit}
                    />
                </Flex>
            </Flex>
        </Box>
    )
}