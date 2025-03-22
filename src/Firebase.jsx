import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./config/firebaseConfig";
import { saveEmployerToken } from "./api/employerapi/employerAPI";
import employerStore from "./stores/employerStore";

const Firebase = ({ eno }) => {
    // Zustand 스토어에서 FCM 토큰과 설정 함수 가져오기
    const fcmToken = employerStore(state => state.fcmToken);
    const setFcmToken = employerStore(state => state.setFcmToken);

    useEffect(() => {
        async function requestPermission() {
            if (!eno) return; // eno가 없으면 실행하지 않음

            try {
                const permission = await Notification.requestPermission();

                if (permission === "granted") {
                    const newFcmToken = await getToken(messaging, {
                        vapidKey: "BEqWJlRWN5cwru0kFbILQaPhBHRyNPFCAKBzVulCJ-nMarDLrjBIQaS36ZTQ_zeOy4RsI2-sUTeN1ThRT5oCZVA"
                    });

                    console.log("FCM Token: ", newFcmToken);

                    // 토큰이 변경되었거나 저장된 토큰이 없는 경우에만 서버로 전송
                    if (newFcmToken && (!fcmToken || fcmToken !== newFcmToken)) {
                        await saveEmployerToken(eno, newFcmToken);
                        // 새 토큰을 Zustand 스토어에 저장
                        setFcmToken(newFcmToken);
                        console.log("새 FCM 토큰이 서버에 저장되었습니다.");
                    } else {
                        console.log("FCM 토큰이 변경되지 않았습니다. 서버 전송 생략.");
                    }
                } else {
                    console.log("알림 권한이 거부되었습니다.");
                }
            } catch (error) {
                console.error("FCM 토큰 처리 실패:", error);
            }
        }

        requestPermission();
    }, [eno, fcmToken, setFcmToken]);

    return null;
};

export default Firebase;