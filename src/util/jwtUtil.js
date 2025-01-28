import axios from "axios";
import employerStore from "../stores/employerStore";
import { refreshRequest } from "../api/loginapi/tokenAPI.js";

const jwtAxios = axios.create();

const beforeReq = (config) => {
    console.log("before Request");

    // Zustand store에서 accessToken을 직접 가져옵니다.
    const accessToken = employerStore.getState().accessToken;

    if (!accessToken) {
        throw new Error("Access token not set");
    }

    console.log(accessToken);

    // accessToken이 있으면 Authorization 헤더에 추가
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
};

const failReq = (error) => {
    console.log("failure");
    return Promise.reject(error);
};

const beforeRes = async (res) => {
    console.log("before Response");

    const data = res.data;

    // 토큰 만료 오류 처리
    if (data.error === 'ERROR_ACCESS_TOKEN' || res.status === 401) {
        console.log("Access token expired");

        const accessToken = employerStore.getState().accessToken;
        const currentRefreshToken = employerStore.getState().refreshToken;

        if (!accessToken || !currentRefreshToken) {
            throw new Error("Access token or refresh token not set");
        }

        try {
            // 리프레시 토큰을 통해 새로운 access token 발급
            const NewRefreshToken = await refreshRequest(currentRefreshToken);

            console.log("New Refresh Token", NewRefreshToken);

            // 상태 업데이트 후 바로 새 값으로 토큰을 설정
            employerStore.getState().setAccessToken(NewRefreshToken.accessToken);
            employerStore.getState().setRefreshToken(NewRefreshToken.refreshToken);

            // 상태가 즉시 반영된 후 새로 업데이트된 토큰을 이용해 재요청
            const updatedAccessToken = employerStore.getState().accessToken;
            console.log("Updated access token", updatedAccessToken);

            // 원본 요청에 새로운 access token 적용
            const originalRequest = res.config;
            originalRequest.headers.Authorization = `Bearer ${updatedAccessToken}`;

            // 새로운 access token으로 재요청
            return await axios(originalRequest);
        } catch (error) {
            console.log("Failed to refresh token", error);
            throw error;
        }
    }

    return res;
};

const failRes = (error) => {
    console.log("fail Response");
    return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;