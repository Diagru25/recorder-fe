import { request } from '../baseRequest';

const suggestApi = {
    getRandomSentence: () => {
        return request({
            url: '/admin/v1/suggests/random_text',
            method: 'GET',
        })
    }
}

export default suggestApi;
