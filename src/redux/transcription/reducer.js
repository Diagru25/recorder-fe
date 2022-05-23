import actions from './action';

const initialState = {
    transcriptionResult: null
}

const reducer = (state = initialState, action) => {
    const payload = action.payload;

    switch(action.type) {
        case actions.types.TRANSCRIPTION:
            return state;
        
        case actions.types.UPDATE_STATE:
            return {
                ...state,
                ...payload.state
            }
        default:
            return state;
    }
}

export default reducer;