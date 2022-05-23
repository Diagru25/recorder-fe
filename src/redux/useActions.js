import authActions from './auth/action';
import recordActions from './record/action';
import transcriptionActions from './transcription/action';

export const useActions = () => {
    const actions = {
        authActions,
        recordActions,
        transcriptionActions
    };

    return actions
}

