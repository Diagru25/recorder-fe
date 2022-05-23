
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import recordSaga from './record/saga';
import transcriptionSaga from './transcription/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        recordSaga(),
        transcriptionSaga()
    ])
}