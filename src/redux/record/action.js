const prefix = 'RECORD_';

const types = {
    GET_RECORD_LIST: prefix + 'GET_RECORD_LIST',
    GET_RECORD_DETAIL_BY_ID: prefix + 'GET_RECORD_DETAIL_BY_ID',
    DELETE_RECORD: prefix + 'DELETE_RECORD',

    GET_RECORD_COMPARE: prefix + 'GET_RECORD_COMPARE',
    UPDATE_RECORD_COMPARE: prefix + 'UPDATE_RECORD_COMPARE',

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

    getRecordCompare: () => {
        return {
            type: types.GET_RECORD_COMPARE,
            payload: {}
        }
    },

    updateRecordCompare: (dataList = []) => {
        return {
            type: types.UPDATE_RECORD_COMPARE,
            payload: {
                dataList
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

const reportActions = {actions, types};

export default reportActions;