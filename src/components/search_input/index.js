import React from 'react';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export const SearchInput = ({ value, width, onSearch, onChange, placeholder }) => {
    return (
        <InputGroup size='sm' w={width || '250px'}>
            <InputLeftElement
                pointerEvents='none'
                children={<FiSearch color='gray.300' />}
            />
            <Input
                type='text'
                placeholder={placeholder || 'Tìm kiếm'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                variant='filled'
                onKeyDown={(e) => e.key === 'Enter' ? onSearch(e.target.value) : {}} />
        </InputGroup>
    )
}