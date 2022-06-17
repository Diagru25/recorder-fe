import {request} from '../baseRequest';

export const iconApi = {
    getAll: () => {
        return request({
            url: '/admin/v1/icons',
            method: 'GET'
        })
    }
}