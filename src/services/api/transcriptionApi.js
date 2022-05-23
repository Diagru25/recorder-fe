import { request } from '../baseRequest';

export const transcriptionApi = {
    transcription: (file) => {
        const formData = new FormData();

        let d = new Date().getTime();
        formData.append('file', file, `${d}.wav`)
        return request({
            url: '/admin/v1/ai/transcription',
            method: 'POST',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }
}

