import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PageHeader, SearchInput, ConfirmModal, Pagination } from '../../components';
import { useActions } from '../../redux/useActions';
import {
    Text, Flex,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td,
    IconButton
} from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';


export const RecordManagement = () => {
    const dispatch = useDispatch();
    const { recordActions } = useActions();

    const currentRecord = useRef(null);

    const recordList = useSelector(state => state.recordReducer.recordList);

    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    useEffect(() => {
        dispatch(recordActions.actions.getRecordList());
    }, [dispatch, recordActions.actions]);

    const handleOnPageChange = (pageIndex) => {
        dispatch(recordActions.actions.getRecordList({ pageIndex }));
    }

    const handleOnPageSizeChange = (pageSize) => {
        dispatch(recordActions.actions.getRecordList({ pageIndex: 1, pageSize }));
    }

    const setTextSearch = (value) => {
        dispatch(recordActions.actions.updateState({
            recordList: {
                ...recordList,
                textSearch: value
            }
        }));
    }

    const handleOpenConfirmModal = (item) => {
        currentRecord.current = item;
        setIsOpenConfirmModal(true);
    }

    const handleDeleteRecord = () => {
        dispatch(recordActions.actions.deleteRecord(currentRecord.current._id));
        setIsOpenConfirmModal(false);
    }

    return (
        <>
            <Text color='gray.500'>Trang chủ / Quản lý bản ghi</Text>
            <PageHeader title='Quản lý bản ghi' />
            <Flex flexDir='column'>
                <Flex justifyContent='flex-end' alignItems='flex-end' mt={3}>
                    <Flex justifyContent='flex-end' mt={3}>
                        <SearchInput
                            value={recordList.textSearch}
                            onChange={setTextSearch}
                            onSearch={() => dispatch(recordActions.actions.getRecordList())}
                        />
                    </Flex>
                </Flex>
                
                <Flex mt={3} flexDir='column'>
                    <Table size='sm'>
                        <Thead>
                            <Tr >
                                <Th>#ID</Th>
                                <Th>Bản ghi</Th>
                                <Th>Văn bản</Th>
                                <Th>Ngày tạo</Th>
                                <Th>Hành động</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                !recordList.isPending ? recordList?.items?.map((item, index) =>
                                    <Tr key={item?._id}>
                                        <Td>{item._id}</Td>
                                        <Td>
                                            <audio controls src={`${process.env.REACT_APP_BASE_URL}/v1/resources/get_file/?filename=${item.audio}`}></audio>
                                        </Td>
                                        <Td>{item.text}</Td>
                                        <Td>{moment(item.created_at).format('DD/MM/yyyy')}</Td>
                                        <Td>
                                            <IconButton
                                                variant='outline'
                                                colorScheme='blue'
                                                size="sm"
                                                mr={3}
                                                icon={<AiOutlineEdit />}
                                                //onClick={() => handleOpenConfirmModal(item)}
                                            />
                                            <IconButton
                                                variant='outline'
                                                colorScheme='red'
                                                size="sm"
                                                mr={3}
                                                icon={<AiOutlineDelete />}
                                                onClick={() => handleOpenConfirmModal(item)}
                                            />
                                        </Td>
                                    </Tr>
                                ) : null
                            }
                        </Tbody>
                    </Table>
                    <Pagination
                        total={recordList.total}
                        pageIndex={recordList.pageIndex}
                        pageSize={recordList.pageSize}
                        onPageChange={handleOnPageChange}
                        onPageSizeChange={handleOnPageSizeChange}
                    />
                </Flex>
            </Flex>
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                onClose={() => setIsOpenConfirmModal(false)}
                onConfirm={handleDeleteRecord}
            />
        </>
    )
}