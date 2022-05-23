import { transcriptionApi } from '../../services/api';
import { fork, all, takeEvery, put } from 'redux-saga/effects';
import actions from './action';
import { log } from '../../helpers/log';

import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

function* transcription_saga(action) {
    try {
        const { audio } = action.payload;

        const res = yield transcriptionApi.transcription(audio);
        const result = res.data;

        yield put(actions.actions.updateState({ transcriptionResult: result }));
    }
    catch (error) {
        log('[TRANSCRIPTION SAGA][transcription_saga]', error);
        yield put(actions.actions.updateState({ transcriptionResult: null }));
    }
}

function* listen() {
    yield takeEvery(actions.types.TRANSCRIPTION, transcription_saga);
}

export default function* authSaga() {
    yield all([fork(listen)]);
}