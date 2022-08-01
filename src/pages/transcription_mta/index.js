import { Box, Button, Flex, Icon, Text, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { log } from '../../helpers/log';
import { transcriptionApi } from '../../services/api';

URL = window.URL || window.webkitURL;

let gumStream; 						//stream from getUserMedia()
let rec; 							//Recorder.js object
let input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext //audio context to help us record


export const TranscriptionMTA = () => {

    const toast = useToast();
    const history = useHistory();
    const [isRecording, setIsRecording] = useState(false);
    const [record, setRecord] = useState({
        url: '',
        blob: ''
    });
    const [transcriptionResult, setTranscriptionResult] = useState('');

    const [file, setFile] = useState(null);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const handleRecord = () => {
        if (isRecording)
            stopRecording();
        else
            startRecording();
        setIsRecording(prev => !prev);
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
            log('[TRANSCRIPTION_MTA]', err);
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

    const handleBack = () => {
        history.goBack();
    }

    const handleTranscription = async (blob) => {
        try {
            // const res = await transcriptionApi.transcriptionMta(blob);
            // console.log(res);
            const formData = new FormData();

            let d = new Date().getTime();
            formData.append('the_file', file, `${d}.wav`);
            formData.append('language', "1");

            // const requestOptions = {
            //     method: 'POST',
            //     //headers: { "Content-Type": "multipart/form-data" },
            //     //data: formData
            //     body: formData
            // };
            // const response = await fetch('https://asr.hpda.vn/recog', requestOptions);
            // console.log(response)
            // const data = await response.json();

            //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            const res = await axios.post('https://asr.hpda.vn/recog', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
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
                    gap={5}
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
                            <input type='file' onChange={handleChangeFile} />
                            <Button onClick={() => handleTranscription('abc')} colorScheme='blue'>up</Button>
                            {
                                record.url && <audio controls src={record.url} />
                            }

                        </Flex>

                        <Flex flex={3} flexDir='column' gap={3}>
                            <Text fontWeight='bold' fontSize={20} color='blue.600'>KẾT QUẢ</Text>
                            <Textarea
                                rows={10}
                                value={transcriptionResult?.text}
                                onChange={() => { }} />
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

        </>
    )
}