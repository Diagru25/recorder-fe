import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RouterLinks } from '../../constants/router.constant';

export const HeaderClient = () => {
    return (
        <Flex
            w='100%'
            justifyContent='center'
            boxShadow='0 2px 4px rgba(0,0,0,0.03);'
        >
            <Flex
                w='100%'
                maxW='76rem'
                justifyContent='space-between'
                p='1rem'>

                {/* menu */}
                <Flex alignItems='center' gap='2rem'>
                    <Text fontSize={18} fontWeight={500}>SPEECH2TEXT</Text>
                    <ul id='menu-client'>
                        <li>ĐÓNG GÓP</li>
                        <Link to={RouterLinks.COMPARE_RECORD}><li>KIỂM TRA</li></Link>
                        <Link to={RouterLinks.TRANSCRIPTION_MTA}><li>DEMO</li></Link>
                        <li>GIỚI THIỆU</li>
                    </ul>
                </Flex>

                {/* actioins info */}
                <Flex alignItems='center'>

                </Flex>
            </Flex>
        </Flex>

    )
}