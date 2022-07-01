const prefix = 'REPORT_';

const types = {
    GET_REPORT_LIST: prefix + 'GET_REPORT_LIST',
    GET_REPORT_DETAIL_BY_ID: prefix + 'GET_REPORT_DETAIL_BY_ID',
    DELETE_REPORT: prefix + 'DELETE_REPORT',
    CREATE_REPORT: prefix + 'CREATE_REPORT',
    UPDATE_STATE: prefix + 'UPDATE_STATE'
}

const actions = {
    getReportList: (params = {}) => {
        return {
            type: types.GET_REPORT_LIST,
            payload: {
                params
            }
        }
    },
    getReportDetailById: (reportId) => {
        return {
            type: types.GET_REPORT_DETAIL_BY_ID,
            payload: {
                reportId
            }
        }
    },
    createReport: (data) => {
        return {
            type: types.CREATE_REPORT,
            payload: {
                data
            }
        }
    },

    deleteReport: (recordId) => {
        return {
            type: types.DELETE_REPORT,
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

const reportActions = {actions, types};

export default reportActions;