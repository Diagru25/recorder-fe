import { request } from '../baseRequest';

const fileApi = {
    uploadFile(fileData) {
        const formData = new FormData();
        formData.append("files", fileData);

        return request({
            url: '/admin/v1/members/import',
            method: 'POST',
            data: formData,
            isAuthRequest: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default fileApi;
