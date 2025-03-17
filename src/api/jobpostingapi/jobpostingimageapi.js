import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

// 이미지 업로드
export const uploadJobPostingImages = async (images, jpno, eno) => {
    try {
        const formData = new FormData();
        formData.append('jpno', jpno);
        formData.append('eno', eno);

        images.forEach(image => {
            formData.append('images', image);
        });

        const response = await axios.post(
            `${API_BASE_URL}/api/jobpostings-images/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        const filenames = response.data.data.filenames;
        return filenames.map(filename =>
            `${IMAGE_BASE_URL}/uploads/jobpostings/${filename}`
        );
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
};

// 이미지 조회
export const getJobPostingImages = async (jpno) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/jobpostings-images/${jpno}`);
        const filenames = response.data.data.filenames;
        return filenames.map(filename =>
            `${IMAGE_BASE_URL}/uploads/jobpostings/${filename}`
        );
    } catch (error) {
        console.error('Failed to fetch images:', error);
        throw error;
    }
};

// 이미지 삭제
export const deleteJobPostingImage = async (jpno, filename) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/api/jobpostings-images/${jpno}`,
            {
                data: { filename },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
        throw error;
    }
};
