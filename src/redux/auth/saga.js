import {authApi} from '../../services/api';
import { fork, all, takeEvery, put } from 'redux-saga/effects';
import actions from './action';

import { clearLocalStorage, writeLocalStorage } from '../../helpers/localStorage';
import { ACCESS_TOKEN } from '../../constants/auth.constant';
import { log } from '../../helpers/log';

import { createStandaloneToast} from '@chakra-ui/react';

const toast = createStandaloneToast();

function* checkSession_saga() {
    try {
        const res = yield authApi.checkSession();

        if (res.statusCode !== 200) {
            yield put(actions.actions.updateState({
                isLoading: false,
                isLoggedIn: false,
                sessionKey: null
            }));
        }
    }
    catch (error) {
        yield put(actions.actions.updateState({
            isLoading: false,
            isLoggedIn: false,
            sessionKey: null
        }));
        log('[AUTH SAGA][checkSession_saga]', error);
    }
}

function* login_saga(action) {
    try {
        const { email, password } = action.payload;

        const res = yield authApi.login(email, password);

        if (res.statusCode === 200) {
            const sessionKey = res.data.access_token;

            writeLocalStorage(ACCESS_TOKEN, sessionKey);

            yield put(actions.actions.updateState({
                sessionKey: sessionKey,
                isLoggedIn: true,
                isLoading: false,
                error: null
            }));

            yield put(actions.actions.getUserInfo());
        }
    }
    catch (error) {
        yield put(actions.actions.updateState({
            isLoading: false,
            isLoggedIn: false,
            sessionKey: null,
            error: 'login failed'
        }));

        toast({
            position: 'top',
            title: "Đăng nhập không thành công",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
        });

        log('[AUTH SAGA][login_saga]', error);
    }
}


function* getUserInfo_saga() {
    try {
        const res = yield authApi.getUserInfo();
        const { user, permissions } = res.data;

        if (user) {
            yield put(actions.actions.updateState({
                isLoading: false,
                isLoggedIn: true,
                userInfo: user,
                permissions,
                error: null
            }))
        }
        else {
            yield put(actions.actions.updateState({
                isLoading: false,
                isLoggedIn: false,
                sessionKey: null,
                userInfo: null,
                permissions: []
            }));

            clearLocalStorage(ACCESS_TOKEN);
        }
    }
    catch (error) {
        yield put(actions.actions.updateState({
            isLoading: false,
            isLoggedIn: false,
            sessionKey: null,
            error: 'Get user info failed'
        }));

        log('[AUTH SAGA][getUserInfo_saga]', error);
    }
}

function* logout_saga(action) {
    try {
        clearLocalStorage(ACCESS_TOKEN);

        yield put(actions.actions.updateState({
            isLoading: false,
            isLoggedIn: false,
            sessionKey: null,
            error: null,
            userInfo: null
        }));
    }
    catch (error) {
        log('[AUTH SAGA][logout_saga]', error);
    }

}

function* listen() {
    yield takeEvery(actions.types.CHECK_SESSION, checkSession_saga);
    yield takeEvery(actions.types.LOGIN, login_saga);
    yield takeEvery(actions.types.GET_USER_INFO, getUserInfo_saga);
    yield takeEvery(actions.types.LOGOUT, logout_saga);
}

export default function* authSaga() {
    yield all([fork(listen)]);
}