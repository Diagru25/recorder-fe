import React from 'react';
import {
    Flex,
    Tooltip,
    IconButton,
    NumberInput,
    Text,
    Select,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper

} from '@chakra-ui/react';

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@chakra-ui/icons';


export const Pagination = ({ total, pageIndex, pageSize, onPageChange, onPageSizeChange }) => {

    const pageCount = Math.ceil((total || 0) / pageSize);

    const gotoPage = (page) => {
        onPageChange(page);
    }
    return (
        <Flex justifyContent="center" m={4} alignItems="center">
            <Flex mr={8}>
                <Tooltip label="Trang sau">
                    <IconButton
                        onClick={() => gotoPage(1)}
                        isDisabled={pageIndex === 1}
                        size='sm'
                        icon={<ArrowLeftIcon h={3} w={3} />}
                        mr={4}
                    />
                </Tooltip>
                <Tooltip label="Trang trước">
                    <IconButton
                        onClick={() => gotoPage(pageIndex - 1)}
                        isDisabled={pageIndex === 1}
                        size='sm'
                        icon={<ChevronLeftIcon h={6} w={6} />}
                    />
                </Tooltip>
            </Flex>

            <Flex alignItems="center">
                <Text flexShrink="0" mr={8}>
                    Trang{" "}
                    <Text fontWeight="bold" as="span">
                        {pageIndex}
                    </Text>{" "}
                    của{" "}
                    <Text fontWeight="bold" as="span">
                        {pageCount}
                    </Text>
                </Text>
                <Text flexShrink="0" as="span">Đến trang:</Text>{" "}
                <NumberInput
                    size='sm'
                    ml={2}
                    mr={8}
                    w={28}
                    min={1}
                    max={pageCount}

                    defaultValue=''
                    onChange={(value) => {
                        return (value > 0 && value <= pageCount) ? gotoPage(value) : null;
                    }}
                    //onKeyDown={e => e.key === 'Enter' ? ((e.target.value > 0 && e.target.value <= total) ? gotoPage(e.target.value) : null) : null}

                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Select
                    size='sm'
                    w={32}
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                >
                    {[10, 20, 30, 40, 50].map((pageSize, index) => (
                        <option key={index} value={pageSize}>
                            Hiển thị {pageSize}
                        </option>
                    ))}
                </Select>
            </Flex>
            <Flex ml={8}>
                <Tooltip label="Trang sau">
                    <IconButton
                        onClick={() => gotoPage(pageIndex + 1)}
                        isDisabled={pageIndex === pageCount}
                        size='sm'
                        icon={<ChevronRightIcon h={6} w={6} />}
                    />
                </Tooltip>
                <Tooltip label="Trang cuối">
                    <IconButton
                        onClick={() => gotoPage(pageCount)}
                        isDisabled={pageIndex === pageCount}
                        size='sm'
                        icon={<ArrowRightIcon h={3} w={3} />}
                        ml={4}
                    />
                </Tooltip>
            </Flex>
        </Flex>
    )

}