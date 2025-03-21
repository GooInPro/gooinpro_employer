// src/Firebase.jsx
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./config/firebaseConfig"; // firebaseConfig.js에서 가져온 messaging 객체

const Firebase = () => {
    useEffect(() => {
        async function requestPermission() {
            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                const token = await getToken(messaging, {
                    vapidKey: "BDSNiEkbnfVQ-Tpz9CfgYhTcwgyfXsx71OtdLWJKUWSnGv_jHEu6KSLJQdwlcbdmEh-OVxicBequKUwNjoSONxc"
                });
                console.log("Token: ", token); // 서버로 토큰 전송하거나 로컬에 저장
            } else {
                alert("알림을 허용하지 않았습니다.");
            }
        }

        requestPermission();
    }, []);

    return null; // UI는 렌더링하지 않음
};

export default Firebase;
