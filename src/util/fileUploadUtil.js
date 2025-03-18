import axios from 'axios';

export const uploadFile = async ({ files, uploadUrl }) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('files', file);
    });

    try {
        const response = await axios.post(uploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            const fileNames = response.data;
            console.log(`파일 업로드 성공: ${fileNames.join(', ')}`);
            return fileNames;
        } else {
            console.error('파일 업로드 실패');
            return [];
        }
    } catch (error) {
        console.error('파일 업로드 오류:', error);
        throw error;
    }
};
