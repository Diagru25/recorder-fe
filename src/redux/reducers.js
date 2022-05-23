import authReducer from './auth/reducer';
import recordReducer from './record/reducer';
import transcriptionReducer from './transcription/reducer';

const rootReducer = {
    authReducer,
    recordReducer,
    transcriptionReducer
}

export default rootReducer;