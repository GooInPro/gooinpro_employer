import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./config/firebaseConfig"; // firebaseConfig.js에서 가져온 messaging 객체
import { saveEmployerToken } from "./api/employerapi/employerAPI";

const Firebase = ({ eno }) => {

    useEffect(() => {
        async function requestPermission() {
            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                try {
                    const fcmToken = await getToken(messaging, {
                        vapidKey: "BDSNiEkbnfVQ-Tpz9CfgYhTcwgyfXsx71OtdLWJKUWSnGv_jHEu6KSLJQdwlcbdmEh-OVxicBequKUwNjoSONxc"
                    });
                    console.log("FCM Token: ", fcmToken);

                    if (fcmToken && eno) {
                        await saveEmployerToken(eno, fcmToken);
                    } else {
                        console.error("eno 값이 없습니다:", eno);
                    }
                } catch (error) {
                    console.error("FCM 토큰 저장 실패:", error);
                }
            }
        }

        requestPermission();
    }, [eno]);

    return null;
};
export default Firebase;
