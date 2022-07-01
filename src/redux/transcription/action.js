const prefix = 'TRANSCRIPTION_';

const types = {
    TRANSCRIPTION: prefix + 'TRANSCRIPTION',
    UPDATE_STATE: prefix + 'UPDATE_STATE'
}

const actions = {
    transcription: (audio = null, report_id = '') => {
        return {
            type: types.TRANSCRIPTION,
            payload: {
                audio,
                report_id
            }
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

const transcriptionActions = {actions, types};
export default transcriptionActions;