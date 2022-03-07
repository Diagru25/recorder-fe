const prefix = 'AUTH_';

const types = {
    LOGIN: prefix + 'LOGIN',
    LOGOUT: prefix + 'LOGOUT',
    CHANGE_PASSWORD: prefix + 'CHANGE_PASSWORD',
    REGISTER: prefix + 'REGISTER',
    GET_USER_INFO: prefix + 'GET_USER_INFO',

    CHECK_SESSION: prefix + 'CHECK_SESSION',

    UPDATE_STATE: prefix + 'UPDATE_STATE'
}

const actions = {
    login: (email = '', password='') => {
        return {
            type: types.LOGIN,
            payload: {
                email,
                password
            }
        }
    },
    logout: () => {
        return {
            type: types.LOGOUT,
            payload: {}
        }
    },
    changePassword: (newPassword = '') => {
        return {
            type: types.CHANGE_PASSWORD,
            payload: {
                newPassword
            }
        }
    },
    register: () => {
        return {
            type: types.REGISTER,
            payload: {}
        }
    },
    checkSession: () => {
        return {
            type: types.CHECK_SESSION,
            payload: {}
        }
    },

    getUserInfo: () => {
        return {
            type: types.GET_USER_INFO,
            payload: {}
        }
    },

    updateState: (state = {}) => {
        return {
            type: types.UPDATE_STATE,
            payload: {
                state
            }
        }
    }
}

const authActions = {actions, types};

export default authActions;