
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Flex, Menu, Link, MenuButton, Icon, Text } from '@chakra-ui/react';

const NavItem = ({ navSize, icon, title, link, active, onClick }) => {
    return (
        <Flex
            mt={30}
            flexDir='column'
            w='100%'
            alignItems={navSize === 'large' ? 'flex-start' : 'center'}
            onClick={onClick}
        >
            <Menu placement='right'>
                <Link as={ReactLink} to={link}
                    backgroundColor={active && 'teal.400'}
                    p={2}
                    paddingX='11px'
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: 'teal.400', color: 'white' }}
                    w={navSize === 'large' && '100%'}
                >
                    <MenuButton w='100%'>
                        <Flex >
                            <Icon as={icon} fontSize='xl' color={active && 'white'} />
                            <Text fontWeight='normal' ml={4} display={navSize === 'large' ? 'flex' : 'none'} color={active && 'white'}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex>
    )
}

export default NavItem;