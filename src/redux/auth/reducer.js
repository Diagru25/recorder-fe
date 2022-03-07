import authActions from './action';
import {readLocalStorage} from '../../helpers/localStorage';
import {ACCESS_TOKEN} from '../../constants/auth.constant';

const _getSessionKey = () => {
    const sessionKey = readLocalStorage(ACCESS_TOKEN);
    return sessionKey ? sessionKey : null
}

const defaultUser = {

}

const initialState = {
    sessionKey: _getSessionKey(),
    isLoggedIn: _getSessionKey() != null,
    
    isLoading: false,
    error: null,
    userInfo: defaultUser,
    permissions: []
}

const reducer = (state = initialState, action) => {
    const payload = action.payload;

    switch(action.type) {
        case authActions.types.LOGIN:
            return state;
        case authActions.types.LOGOUT:
            return state;
        case authActions.types.CHANGE_PASSWORD:
            return state;
        case authActions.types.CHECK_SESSION:
            return state;
        case authActions.types.GET_USER_INFO:
            return state;
        case authActions.types.UPDATE_STATE:
            return {
                ...state,
                ...payload.state
            }
        default:
            return state;
    }
}

export default reducer;