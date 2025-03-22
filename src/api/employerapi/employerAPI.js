import jwtAxios from "../../util/jwtUtil.js";

const host =`${import.meta.env.VITE_API_HOST}/emp`;

// 고용주 정보 조회
export const EmployerRead = async (eno) => {
    console.log("📌 [EmployerAPI] 고용주 정보 조회 요청");

    const res = await jwtAxios.get(`${host}/read/${eno}`);

    console.log("✅ [EmployerAPI] 고용주 정보 조회 성공:", res.data);

    return res.data;
};

// 고용주 정보 수정
export const EmployerEdit = async (eno, updateData) => {
    console.log("📌 [EmployerAPI] 고용주 정보 수정 요청");

    const res = await jwtAxios.put(`${host}/edit/${eno}`, updateData);

    console.log("✅ [EmployerAPI] 고용주 정보 수정 완료:", res.data);

    return res.data;
};

// 고용주 FCM 토큰 저장 (백엔드 DB에 전달)
export const saveEmployerToken = async (eno, etoken) => {
    console.log("📌 [EmployerAPI] 고용주 FCM 토큰 저장 요청", { eno, etoken });

    if (!eno) {
        console.error("eno 값이 없습니다");
        return;
    }

    const res = await jwtAxios.post(`${host}/${eno}/fcm-token`, { etoken });

    console.log("✅ [EmployerAPI] 고용주 FCM 토큰 저장 완료:", res.data);
    return res.data;
};
