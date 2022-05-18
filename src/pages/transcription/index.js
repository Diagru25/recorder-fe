import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Text, useToast, Button, Image, Textarea } from '@chakra-ui/react';
import { BsArrowLeftShort, BsMic, BsSquare } from 'react-icons/bs';
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
    const [result, setResult] = useState(null);

    const handleRecord = () => {


        if (isRecording) {
            stopRecording();
            //handleSubmit();
        }
        else {
            startRecording();

        }
        setIsRecording(!isRecording);

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
            log('[TRANSCRIPTION]', err);
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
        handleSubmit(blob);
    };

    const handleSubmit = async (blob) => {
        try {
            const res = await transcriptionApi.transcription(blob ? blob : record.blob);

            //console.log(res.data);
            setResult(res.data);

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

                <Flex gap={8}>
                    <Flex flex={1} flexDir='column' alignContent='flex-start' gap={3}>
                        <Text fontWeight='bold' fontSize={20} color='blue.600'>THU ÂM</Text>
                        <Button onClick={handleRecord} colorScheme='blue'>{isRecording ? 'Dừng' : 'Ghi âm'}</Button>

                        {
                            record.url && <audio controls src={record.url} />
                        }

                    </Flex>
                    <Flex flex={3} flexDir='column' gap={3}>
                        <Text fontWeight='bold' fontSize={20} color='blue.600'>KẾT QUẢ</Text>
                        <Textarea value={result?.text} onChange={() => { }} />
                    </Flex>

                </Flex>



                {result !== null
                    ?
                    <Flex flexDir='column'>
                        <Flex>
                            <Text><b>Câu lệnh: </b>{result.commands.join(',')}</Text>
                        </Flex>
                        <Flex>
                            <Text fontWeight='bold' mr={2}>Danh sách vị trí:</Text>
                            <Flex flexDir='column'>
                                {
                                    result.locations.map((item, index) =>
                                        <Text key={index}>{item.name} [{item.coordinate.join(',')}]</Text>
                                    )
                                }
                            </Flex>
                        </Flex>
                        <Flex>
                            <Text fontWeight='bold' mr={2}>Dánh sách icon:</Text>
                            <Flex flexDir='column'>
                                {
                                    result.icons.map((item, index) => <Flex key={index} alignItems='center' gap={2}>
                                        <Text >{item.name}</Text>
                                        <Image src={`${process.env.REACT_APP_BASE_URL}/v1/resources/get_file/?filename=${item.icon}`} w={6} h={6} />
                                    </Flex>)
                                }
                            </Flex>

                        </Flex>
                    </Flex>
                    :
                    null
                }

                {/* <Flex justifyContent='space-between'>
                    <OutLineButton
                        text='Gửi lên'
                        //isDisabled={recordList.length > 0 ? false : true}
                        onClick={handleSubmit}
                    />
                </Flex> */}
            </Flex>
        </Box>
    )
}