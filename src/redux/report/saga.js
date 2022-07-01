import {reportApi} from '../../services/api';
import { fork, all, takeEvery, put, select } from 'redux-saga/effects';
import actions from './action';
import { log } from '../../helpers/log';

import { createStandaloneToast} from '@chakra-ui/react';

const toast = createStandaloneToast();

function* getReportList_saga(action) {
    try {

        const { params } = action.payload;
        const reportList = yield select(state => state.recordReducer.reportList);

        const pageSize = params.pageSize
            ? params.pageSize
            : reportList.pageSize;
        const pageIndex = params.pageIndex
            ? params.pageIndex
            : reportList.pageIndex;
        const textSearch =
            params.textSearch !== undefined
                ? params.textSearch
                : reportList.textSearch;

        const res = yield reportApi.getReportList(pageIndex, pageSize, textSearch);

        const { items, page_index, page_size, total } = res.data;

        yield put(actions.actions.updateState({
            reportList: {
                ...reportList,
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
            reportList: {
                items: [],
                total: 0,
                pageIndex: 0,
                pageSize: 20,
                isPending: false,
                error: 'get list failed'
            }
        }));
        //yield put(actions.actions.setDefaultChildren());
        log('[RECORD SAGA][getreportList_saga]', error);
    }
}

function* getReportDetailById_saga(action) {
    try {
        const { recordId } = action.payload;

        const res = yield reportApi.getReportDetailById(recordId);
        const result = res.data;

        yield put(actions.actions.updateState({ currentReport: result }));
    }
    catch (error) {
        log('[RECORD SAGA][getReportDetailById_saga]', error);
    }
}

function* deleteReport_saga(action) {
    try {
        const { reportId } = action.payload;

        // yield reportApi.dele(reportId);

        // yield put(actions.actions.getRecordList());

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

function* createReport_saga(action) {
    try {
        const { data } = action.payload;

        yield reportApi.createReport(data);

        yield put(actions.actions.getReportList());

        toast({
            position: 'top',
            description: 'Thêm bản ghi thành công',
            status: 'success',
            duration: 5000,
            isClosable: true
        })
    }
    catch (error) {
        toast({
            position: 'top',
            title: 'Them bản ghi không thành công',
            description: error.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        });
        log('[RECORD SAGA][createRecord_saga]', error);
    }
}

function* listen() {
    yield takeEvery(actions.types.GET_REPORT_LIST, getReportList_saga);
    yield takeEvery(actions.types.GET_REPORT_DETAIL_BY_ID, getReportDetailById_saga);
    yield takeEvery(actions.types.CREATE_REPORT, createReport_saga);
}

export default function* reportSaga() {
    yield all([fork(listen)]);
}