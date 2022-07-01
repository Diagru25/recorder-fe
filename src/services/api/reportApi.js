import { request } from '../baseRequest';

export const reportApi = {
    getReportList: (page_index, page_size, text_search = '') => {
        return request({
            url: '/admin/v1/reports/',
            method: 'GET',
            //isAuthRequest: true,
            params: {
                page_index,
                page_size,
                text_search
            }
        })
    },

    getReportSelect: (text_search = '') => {
        return request({
            url: '/admin/v1/reports/select',
            method: 'GET',
            //isAuthRequest: true,
            params: {
                text_search
            }
        })
    },

    getReportById: (id) => {
        return request({
            url: `/admin/v1/reports/${id}`,
            method: 'GET',
            //isAuthRequest: true
        })
    },

    createReport: (data = {}) => {
        return request({
            url: '/admin/v1/reports',
            method: 'POST',
            data: data
        })
    }

    // deleteRecord: (recordId) => {
    //     return request({
    //         url: `/admin/v1/records/${recordId}`,
    //         method: 'DELETE',
    //         isAuthRequest: true
    //     })
    // }
}
