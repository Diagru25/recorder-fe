import authActions from './auth/action';
import recordActions from './record/action';
import reportActions from './report/action';
import transcriptionActions from './transcription/action';

export const useActions = () => {
    const actions = {
        authActions,
        recordActions,
        transcriptionActions,
        reportActions
    };
    return actions
}

