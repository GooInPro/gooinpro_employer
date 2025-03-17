import React, { useState } from 'react';
import { uploadImages } from '../../api/jobpostingapi/jobpostingimageapi.js';

const JobPostingImageComponent = ({ jpno, eno, onUploadSuccess }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setUploadStatus('Please select files to upload.');
            return;
        }

        setUploadStatus('Uploading...');
        try {
            const result = await uploadImages(selectedFiles, jpno, eno);
            onUploadSuccess(result);
            setSelectedFiles([]);
            setUploadStatus('Upload successful!');
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus('Upload failed. Please try again.');
        }
    };

    return (
        <div className="job-posting-image-uploader">
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-input"
            />
            <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
                className="upload-button"
            >
                Upload Images
            </button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
    );
};

export default JobPostingImageComponent;
