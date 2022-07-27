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
    },

    getRecordCompare: (quantity = 5) => {
        return request({
            url: '/admin/v1/records/random_compare',
            method: 'GET',
            params: {
                quantity
            },
            isAuthRequest: false
        })
    },

    updateCompare: (dataList = []) => {
        return request({
            url: '/admin/v1/records/update_compare',
            method: 'POST',
            data: {
                dataList
            },
            isAuthRequest: false
        })
    }

}
