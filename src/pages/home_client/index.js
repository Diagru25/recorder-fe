import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { RouterLinks } from '../../constants/router.constant';
import { BsMic, BsPlayFill } from 'react-icons/bs';
import { HeaderClient } from '../../components';

export const HomeClient = () => {

    const history = useHistory();

    return (
        <Box>
            <HeaderClient/>
            <Box>

                {/* record */}
                <Flex w='100%' borderTop='1px solid #f3f2f0'>
                    <Flex
                        backgroundImage='https://commonvoice.mozilla.org/dist/df91fa2ab6ba9b38ce01ac2e7dab5947.svg'
                        backgroundSize='contain'
                        backgroundRepeat='no-repeat'
                        style={{
                            backgroundPositionX: 'center',
                            backgroundPositionY: '100%'
                        }}
                        h='500px'
                        w='50%'
                        p='130px 100px 0'
                        transitionProperty='width'
                        transitionDuration='1s'
                        justifyContent='center'

                        _hover={{
                            cursor: 'pointer',
                            w: '70%',
                        }}
                        onClick={() => history.push(RouterLinks.RECORDER)}
                    >

                        <Box maxW='50%'>
                            <Text fontSize={48} fontWeight={400}>
                                Thu âm
                            </Text>
                            <Text fontSize={20} fontWeight={400}>
                                Đóng góp vì cộng đồng
                            </Text>
                        </Box>
                        <Box pt={2}>
                            <Flex
                                w='88px'
                                h='88px'
                                border='none'
                                borderRadius='50%'
                                alignItems='center'
                                justifyContent='center'
                                backgroundColor='white'
                                marginX='40px'

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
                                    <Icon as={BsMic} w={8} h={8} color='#ff4f5e' />
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
                        </Box>
                    </Flex>
                    <Flex
                        backgroundImage='https://commonvoice.mozilla.org/dist/2212d74e9ef542d06e4d015f6a04be57.svg'
                        backgroundSize='contain'
                        backgroundRepeat='no-repeat'
                        style={{
                            backgroundPositionX: 'center',
                            backgroundPositionY: '100%'
                        }}
                        h='500px'
                        w='50%'
                        p='130px 100px 0'
                        transitionProperty='width'
                        transitionDuration='1s'
                        justifyContent='center'

                        _hover={{
                            cursor: 'pointer',
                            w: '70%',
                        }}

                        onClick={() => history.push(RouterLinks.TRANSCRIPTION)}
                    >

                        <Box maxW='50%'>
                            <Text fontSize={48} fontWeight={400}>
                                Thử nghiệm
                            </Text>
                            <Text fontSize={20} fontWeight={400}>
                                Giúp chúng tôi cải thiện AI
                            </Text>
                        </Box>
                        <Box pt={2}>
                            <Flex
                                w='88px'
                                h='88px'
                                border='none'
                                borderRadius='50%'
                                alignItems='center'
                                justifyContent='center'
                                backgroundColor='white'
                                marginX='40px'
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
                                    <Icon as={BsPlayFill} w={8} h={8} color='#59cbb7' />
                                </Flex>
                                <Box
                                    w='100px'
                                    h='100px'
                                    m={0}
                                    borderRadius='50%'
                                    background='linear-gradient(270deg,#88d1f1,#b1b5e5)'
                                    position='absolute'
                                    filter='blur(5.6px)'
                                    opacity='0.5'
                                >

                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
                <Flex backgroundColor='#f9f9f8' p='95px 20px 140px 0px' justifyContent='center'>
                    <Flex
                        maxW='76rem'
                        justifyContent='center'
                    >
                        <Box
                            w='50%'
                            maxW='570px'
                            mr='30px'
                        >
                            <Text fontSize={34} fontWeight={400}>
                                Speech2Text là một sáng kiến ​​giúp dạy cho máy móc cách người thật nói.
                            </Text>
                        </Box>
                        <Box
                            w='50%'
                            maxW='570px'
                        >
                            <Text fontSize={16} color='#4a4a4a' lineHeight='1.5' mb={4}>
                                Giọng nói là tự nhiên, giọng nói là con người.
                                Đó là lý do tại sao chúng tôi rất hào hứng với việc tạo ra công nghệ giọng nói có thể sử dụng được cho máy của mình.
                                Nhưng để tạo ra hệ thống thoại, các nhà phát triển cần một lượng dữ liệu thoại cực kỳ lớn.
                            </Text>
                            <Text fontSize={16} color='#4a4a4a' lineHeight='1.5'>
                                Hầu hết dữ liệu được sử dụng bởi các công ty lớn không có sẵn cho đa số mọi người.
                                Chúng tôi nghĩ rằng sự đổi mới đã kìm hãm sự đổi mới.
                                Vì vậy, chúng tôi đã khởi chạy Common Voice, một dự án giúp mọi người đều có thể sử dụng tính năng nhận dạng giọng nói.
                            </Text>
                        </Box>
                    </Flex>

                </Flex>
            </Box>
        </Box>
       
    )
}