const prefix = 'RECORD_';

const types = {
    GET_RECORD_LIST: prefix + 'GET_RECORD_LIST',
    GET_RECORD_DETAIL_BY_ID: prefix + 'GET_RECORD_DETAIL_BY_ID',
    DELETE_RECORD: prefix + 'DELETE_RECORD',

    UPDATE_STATE: prefix + 'UPDATE_STATE'
}

const actions = {
    getRecordList: (params = {}) => {
        return {
            type: types.GET_RECORD_LIST,
            payload: {
                params
            }
        }
    },
    getRecordDetailById: (recordId) => {
        return {
            type: types.GET_RECORD_DETAIL_BY_ID,
            payload: {
                recordId
            }
        }
    },
    deleteRecord: (recordId) => {
        return {
            type: types.DELETE_RECORD,
            payload: {
                recordId
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

const authActions = {actions, types};

export default authActions;