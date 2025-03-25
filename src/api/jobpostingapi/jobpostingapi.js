import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/jobposting`;

export const registerJobPosting = async (payload) => {
    try {
        const res = await axios.post(`${host}/register`, payload, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const updateJobPosting = async (jpno, payload) => {
    try {
        const res = await axios.put(`${host}/edit/${jpno}`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteJobPosting = async (jpno, eno) => {
    try {
        const res = await axios.delete(`${host}/${jpno}`, {
            data: { eno } // ✅ `data` 속성 사용
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getJobPosting = async (jpno, eno) => {
    try {
        const res = await axios.get(`${host}/${jpno}`, { params: { eno } });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const listJobPostings = async (eno) => {
    try {
        const res = await axios.get(`${host}/list`, { params: { eno } });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const listAllJobPostings = async (page = 1, size = 10) => {
    try {
        const res = await axios.get(`${host}/list/all`, {
            params: { page, size }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};