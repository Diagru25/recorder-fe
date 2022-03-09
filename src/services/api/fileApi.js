import { request } from '../baseRequest';

const fileApi = {
    uploadFile(fileData, data) {
        const formData = new FormData();
        formData.append("audio", fileData);

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
