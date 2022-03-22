import authActions from './auth/action';
import recordActions from './record/action';

export const useActions = () => {
    const actions = {
        authActions,
        recordActions
    };

    return actions
}

