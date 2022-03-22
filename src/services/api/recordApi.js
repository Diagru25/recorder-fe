import { request } from '../baseRequest';

export const recordApi = {
    getRecordList: (page_index, page_size, text_search = '') => {
        return request({
            url: '/admin/v1/records/',
            method: 'GET',
            isAuthRequest: true,
            params: {
                page_index,
                page_size,
                text_search
            }
        })
    },

    getRecordDetailById: (recordId) => {
        return request({
            url: `/admin/v1/records/${recordId}`,
            method: 'GET',
            isAuthRequest: true
        })
    },

    deleteRecord: (recordId) => {
        return request({
            url: `/admin/v1/records/${recordId}`,
            method: 'DELETE',
            isAuthRequest: true
        })
    }
}
