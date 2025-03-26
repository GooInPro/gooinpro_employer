// src/api/mapapi/mapapi.js
import axios from "axios";

const host =`${import.meta.env.VITE_API_HOST}/map`


// 로그인 사용자의 근무지 정보 가져오기
export const getWorkplaceByEno = async (eno) => {
    try {
        const res = await axios.get(`${host}/workplace/${eno}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 전체 근무지 데이터 가져오기
export const getAllWorkplaces = async () => {
    try {
        const res = await axios.get(`${host}/workplaces`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 주소를 좌표로 변환하는 함수 (지오코딩)
export const geocodeAddress = async (address) => {
    try {
        const res = await axios.get(`${host}/geocode`, {
            params: { query: address }
        });
        if (res.data.addresses && res.data.addresses.length > 0) {
            const { x, y } = res.data.addresses[0];
            return { lat: parseFloat(y), lng: parseFloat(x) };
        } else {
            throw new Error("좌표 변환 결과가 없습니다.");
        }
    } catch (error) {
        console.error("Geocode API 호출 실패:", error);
        throw error;
    }
};
