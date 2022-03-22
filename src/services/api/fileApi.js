import { request } from '../baseRequest';

export const fileApi = {
    uploadFile(fileList, textList, data) {
        const formData = new FormData();

        let d = new Date().getTime();
        const length = fileList.length;
        for(let i = 0; i < length; i++) {
            formData.append("files", fileList[i], `${d}${i}.wav`);
        }

        for(let i = 0; i < length; i++) {
            formData.append("texts", textList[i])
        }

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        return request({
            url: '/admin/v1/records/upload',
            method: 'POST',
            data: formData,
            isAuthRequest: false,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default fileApi;
