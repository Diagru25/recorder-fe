import { request } from '../baseRequest';

const transcriptionApi = {
    transcription: (file) => {
        const formData = new FormData();

        let d = new Date().getTime();
        formData.append('file', file, `${d}.wav`)
        return request({
            url: 'http://localhost:8000/transcription',
            method: 'POST',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }
}

export default transcriptionApi;
