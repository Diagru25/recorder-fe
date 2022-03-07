import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import './UploadButton.css';

const UploadButton = ({ onSuccess }) => {

    const {toast} = useToast();
    const [fileName, setFileName] = useState('');

    const handleChange = async (e) => {

        const fileTypes = ['xlsx'];
        const file = e.target.files[0];
        const filename = file.name;
        const extension = filename.split('.').pop().toLowerCase();

        const isSuccess = fileTypes.indexOf(extension) > -1;

        setFileName(filename);

        if (isSuccess) {
            onSuccess(file);
        }
        else {
            toast({
                title: "Lỗi",
                description: "Định dạng file không đúng!",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
        }}>
            <div className='btnUpload'>
                <input type="file" id="file" onChange={handleChange} />
                <label htmlFor="file" className="btn-1">Nhập từ file</label>
            </div>

            <div>{fileName}</div>
        </div>
    )
}

export default UploadButton;