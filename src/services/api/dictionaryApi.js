import { request } from '../baseRequest';

export const dictionaryApi = {
    getRandomSentence: () => {
        return request({
            url: '/admin/v1/dictionary/random_text',
            method: 'GET',
        })
    }
}

