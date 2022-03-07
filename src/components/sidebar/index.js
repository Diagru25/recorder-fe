import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RouterLinks } from '../../constants/router.constant';

import { Flex, IconButton, Image } from '@chakra-ui/react';
import { FiMenu, FiHome, FiUser, FiUsers } from 'react-icons/fi';
import { AiOutlineSolution, AiOutlineMedicineBox, AiOutlineFileDone, AiOutlineShop, AiOutlineUser } from 'react-icons/ai';
import NavItem from './NavItem';
// import logo from '../../assets/images/logo.png';


export const SideBar = () => {

    const location = useLocation();
    const [navSize, setNavSize] = useState('large');
    const [activeLink, setActiveLink] = useState(RouterLinks.HOME_PAGE);
    const userInfo = useSelector(state => state.authReducer.userInfo);

    useEffect(() => {
        let nextPage = RouterLinks.HOME_PAGE;
        try {
            //su dung de login lai link cu
            nextPage = location.pathname;
            //nextPage = RouterLinks.HOME_PAGE
        } catch { }

        if (nextPage !== RouterLinks.HOME_PAGE)
            setActiveLink(nextPage);
        else
            setActiveLink(RouterLinks.HOME_PAGE);

    }, [])

    if (!userInfo)
        return null;
    return (
        <Flex
            pos='sticky'
            minH='100vh'
            w={navSize === 'large' ? '280px' : '75px'}
            flexDir='column'
            transition='width 0.5s'
            //boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
            bgColor='#f8f9fd'
        //bgColor='gray.700'
        //color='white'
        >
            <Flex
                p='5%'
                flexDir='column'
                alignItems={navSize === 'large' ? 'flex-start' : 'center'}
                as='nav'
            >
                <Flex align='center' mb={5}>
                    <IconButton
                        background='none'
                        _hover={{ background: 'none' }}
                        icon={<FiMenu fontSize='1.25rem' />}
                        onClick={() => { navSize === 'large' ? setNavSize('small') : setNavSize('large') }}
                    />
                    {/* <Image
                        src={logo}
                        alt="Logo"
                        h='60px'
                        ml={5}
                        display={navSize === 'large' ? 'flex' : 'none'} /> */}
                </Flex>

                <NavItem
                    navSize={navSize}
                    icon={FiHome}
                    title='Trang chủ'
                    active={activeLink === RouterLinks.HOME_PAGE && true}
                    link={RouterLinks.HOME_PAGE}
                    onClick={() => setActiveLink(RouterLinks.HOME_PAGE)}
                />
                
            </Flex>
        </Flex>
    )
}