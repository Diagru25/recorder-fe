import { recordApi } from '../../services/api';
import { fork, all, takeEvery, put, select } from 'redux-saga/effects';
import actions from './action';
import { log } from '../../helpers/log';

import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

function* getRecordList_saga(action) {
    try {

        const { params } = action.payload;
        const recordList = yield select(state => state.recordReducer.recordList);

        const pageSize = params.pageSize
            ? params.pageSize
            : recordList.pageSize;
        const pageIndex = params.pageIndex
            ? params.pageIndex
            : recordList.pageIndex;
        const textSearch =
            params.textSearch !== undefined
                ? params.textSearch
                : recordList.textSearch;

        const res = yield recordApi.getRecordList(pageIndex, pageSize, textSearch);

        const { items, page_index, page_size, total } = res.data;

        yield put(actions.actions.updateState({
            recordList: {
                ...recordList,
                items: items,
                total,
                pageIndex: page_index,
                pageSize: page_size,
                isPending: false
            }
        }));

        //yield put(actions.actions.setDefaultChildren());
    }
    catch (error) {
        yield put(actions.actions.updateState({
            recordList: {
                items: [],
                total: 0,
                pageIndex: 0,
                pageSize: 20,
                isPending: false,
                error: 'get list failed'
            }
        }));
        //yield put(actions.actions.setDefaultChildren());
        log('[RECORD SAGA][getRecordList_saga]', error);
    }
}

function* getRecordDetailById_saga(action) {
    try {
        const { recordId } = action.payload;

        const res = yield recordApi.getRecordDetailById(recordId);
        const result = res.data;

        yield put(actions.actions.updateState({ currentRecord: result }));
    }
    catch (error) {
        log('[RECORD SAGA][getRecordDetailById_saga]', error);
    }
}

function* deleteRecord_saga(action) {
    try {
        const { recordId } = action.payload;

        yield recordApi.deleteRecord(recordId);

        yield put(actions.actions.getRecordList());

        toast({
            position: 'top',
            description: 'Xóa bản ghi thành công',
            status: 'success',
            duration: 5000,
            isClosable: true
        })
    }
    catch (error) {
        toast({
            position: 'top',
            title: 'Xóa bản ghi không thành công',
            description: error.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        });
        log('[RECORD SAGA][deleteRecord_saga]', error);
    }
}

function* getRecordCompare_saga() {
    try {
        const res = yield recordApi.getRecordCompare();
        //console.log(res);

        yield put(actions.actions.updateState({ recordCompareList: res.data }));
    }
    catch (error) {
        toast({
            position: 'top',
            title: 'Lấy bản ghi không thành công',
            description: error.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        });
        log('[RECORD SAGA][getRecordCompare_saga]', error);
    }
}

function* updateRecordCompare_saga(action) {
    try {
        const { dataList } = action.payload;

        yield recordApi.updateCompare(dataList);

        yield put(actions.actions.updateState({ updateCompareList: [] }));

        toast({
            position: 'top',
            title: 'Upload thành công',
            description: 'Xin chân thành cảm ơn!',
            status: 'success',
            duration: 5000,
            isClosable: true
        });
    }
    catch (error) {
        toast({
            position: 'top',
            title: 'Lấy bản ghi không thành công',
            description: error.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        });
        log('[RECORD SAGA][getRecordCompare_saga]', error);
    }
}

function* listen() {
    yield takeEvery(actions.types.GET_RECORD_LIST, getRecordList_saga);
    yield takeEvery(actions.types.GET_RECORD_DETAIL_BY_ID, getRecordDetailById_saga);
    yield takeEvery(actions.types.DELETE_RECORD, deleteRecord_saga);
    yield takeEvery(actions.types.GET_RECORD_COMPARE, getRecordCompare_saga);
    yield takeEvery(actions.types.UPDATE_RECORD_COMPARE, updateRecordCompare_saga);
}

export default function* recordSaga() {
    yield all([fork(listen)]);
}