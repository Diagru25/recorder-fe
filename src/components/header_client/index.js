import React from 'react';
import { Flex, Text } from '@chakra-ui/react';


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
                        <li>DATASET</li>
                        <li>NGÔN NGỮ</li>
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