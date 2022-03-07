import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActions } from '../../redux/useActions';
import { Link as ReactLink, useLocation, Redirect } from 'react-router-dom';

import { RouterLinks } from '../../constants/router.constant';

import { Box, Flex, Heading, Input, Button, Link } from '@chakra-ui/react';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { authActions } = useActions();

    const { isLoggedIn } = useSelector(state => state.authReducer);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(authActions.actions.login(email, password));
    }

    const location = useLocation();

    let nextPage = RouterLinks.HOME_PAGE;
    try {
        nextPage = location.state.from;
    } catch { }

    if (isLoggedIn) {
        if (nextPage !== RouterLinks.LOGIN_PAGE)
            return <Redirect to={nextPage} />;
        else return <Redirect to={RouterLinks.HOME_PAGE} />;
    }

    return (
        <Box w='100%' h='100vh'>
            <Box w='100%' h='100%' bgColor='gray.800' position='absolute' zIndex='-1'
                style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 50% 100%)' }}>
            </Box>
            <Box position='absolute' top='40%' left='10%' transform='translateY(-50%)'>
                <Heading as="h1" size="3xl" lineHeight={1.5}>Chào mừng tới hệ thống</Heading>
                <Heading as="h1" size="3xl"><span style={{ color: '#319795' }}>Speech to text</span> </Heading>
            </Box>
            <Box position='absolute' top='50%' right='10%' transform='translateY(-50%)'>
                <Flex direction='column' w='400px' bgColor='white' p={10} rounded={6}>
                    <Heading mb={6} >Đăng nhập</Heading>
                    <Input variant='filled' type='email' mb={3} bgColor='gray.200'
                        value={email}
                        placeholder='example@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input variant='filled' type='password' mb={6} bgColor='gray.200'
                        value={password}
                        placeholder='Mật khẩu'
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleLogin() : null}
                    />
                    <Button colorScheme='teal' mb={6}
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </Button>

                    <Flex justifyContent='space-between'>
                        <Link as={ReactLink} to='/forgot-password'
                            color='teal'
                            _hover={{ textDecoration: 'none', color: 'teal.400' }}
                        >
                            Quên mật khẩu</Link>

                        {/* <Link as={ReactLink} to='/register-agent'
                            color='teal'
                            _hover={{ textDecoration: 'none', color: 'teal.400' }}
                        >
                            Đăng ký
                        </Link> */}
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}