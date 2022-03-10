import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export const OutLineButton = ({ isDisabled, isSelected, text, onClick, style }) => {
    return (
        <Flex
            style={style}
            h='57px'
            backgroundColor={isDisabled ? '#f3f2f1' : 'white'}
            alignItems='center'
            justifyContent='center'
            border='1px solid rgba(0,0,0,.1)'
            borderColor={isSelected && 'black'}
            borderRadius='50px'
            p='0 38px'
            _hover={{
                cursor: isDisabled ? 'auto' : 'pointer',
                borderColor: !isDisabled && '#000'
            }}
            onClick={!isDisabled ? onClick : undefined}
        >
            <Text fontWeight={500} color={isDisabled ? '#959595' : 'black'}>{text}</Text>
        </Flex>
    )
}