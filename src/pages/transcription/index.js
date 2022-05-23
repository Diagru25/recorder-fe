import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActions } from '../../redux/useActions';
import { Box, Flex, Icon, Text, useToast, Button, Image, Textarea } from '@chakra-ui/react';
import { BsArrowLeftShort, BsMic, BsSquare } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { log } from '../../helpers/log';
import Map from './map';


URL = window.URL || window.webkitURL;

let gumStream; 						//stream from getUserMedia()
let rec; 							//Recorder.js object
let input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext //audio context to help us record



export const Transcription = () => {

    const dispatch = useDispatch();
    const { transcriptionActions } = useActions();
    const toast = useToast();
    const history = useHistory();

    const transcriptionResult = useSelector(state => state.transcriptionReducer.transcriptionResult);
    const [isRecording, setIsRecording] = useState(false);
    const [record, setRecord] = useState({
        url: '',
        blob: ''
    });

    const handleRecord = () => {
        if (isRecording)
            stopRecording();
        else
            startRecording();
        setIsRecording(prev => !prev);
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
        handleTranscription(blob);
    };

    const handleTranscription = (blob) => {
        dispatch(transcriptionActions.actions.transcription(blob));
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
                gap={10}
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
                        <Textarea value={transcriptionResult?.text} onChange={() => { }} />
                    </Flex>

                    {transcriptionResult !== null
                        ?
                        <Flex flexDir='column' flex={2}>
                            <Flex>
                                <Text><b>Câu lệnh: </b>{transcriptionResult?.commands.join(',')}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold' mr={2}>Danh sách vị trí:</Text>
                                <Flex flexDir='column'>
                                    {
                                        transcriptionResult?.locations?.map((item, index) =>
                                            <Text key={index}>{item.name} [{item.coordinate.join(',')}]</Text>
                                        )
                                    }
                                </Flex>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold' mr={2}>Dánh sách icon:</Text>
                                <Flex flexDir='column'>
                                    {
                                        transcriptionResult?.icons.map((item, index) => <Flex key={index} alignItems='center' gap={2}>
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

                </Flex>
                <Map locations={transcriptionResult?.locations || []} />
            </Flex>
        </Box>
    )
}