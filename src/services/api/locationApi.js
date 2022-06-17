import {request} from '../baseRequest';

export const locationApi = {
    getAll: () => {
        return request({
            url: '/admin/v1/locations',
            method: 'GET'
        })
    }
}