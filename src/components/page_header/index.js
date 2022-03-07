
import React from 'react';
import { Text } from '@chakra-ui/layout';


export const PageHeader = ({title, ...rest}) => {
    return(
        <Text
            fontSize='24px'
            fontWeight='bold'
            paddingY={4}
            {...rest}
        >
            {title}
        </Text>
    )
}