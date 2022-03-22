import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActions } from '../../redux/useActions';

import { FiLogOut, FiUser } from 'react-icons/fi';
import {
    Link,
    Flex,
    Avatar,
    Heading,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    IconButton
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { RouterLinks } from '../../constants/router.constant';
import { AiOutlineCopy } from 'react-icons/ai';

export const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.authReducer);
    const { authActions } = useActions();

    const handleLogout = () => {
        dispatch(authActions.actions.logout());
    }

    if (!userInfo)
        return null;
    return (
        <Flex
            w='100%'
            justifyContent='flex-end'
            alignItems='center'
            p={3}
            gridGap='10px'
        >
            <Menu>
                <MenuButton>
                    <Flex align='center'>
                        <Avatar size='sm' src={userInfo.avatar} />
                        <Flex flexDir='column' alignItems='flex-start' ml={3}>
                            <Heading as='h4' size='sm'>{userInfo.full_name}</Heading>
                            <Text color='gray' fontSize='sm'>{userInfo.email}</Text>
                        </Flex>
                    </Flex>
                </MenuButton>
                <MenuList>
                    <Link as={ReactLink} to={RouterLinks.PROFILE} _hover={{ textDecoration: 'none' }}>
                        <MenuItem icon={<FiUser />}>
                            Hồ sơ cá nhân
                        </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                        Đăng xuất
                    </MenuItem>
                </MenuList>
            </Menu>

        </Flex>
    )
}