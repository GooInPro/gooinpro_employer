import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase 설정 (Firebase 콘솔에서 확인 가능)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: "gooinpro-employer.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: "G-LH9J5NBTKN"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ FCM 토큰 가져오기
const getFCMToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
        if (currentToken) {
            console.log("FCM Token:", currentToken);
            // 백엔드 API로 FCM 토큰 전송
            await sendTokenToServer(currentToken);
        } else {
            console.log("FCM 토큰을 가져올 수 없습니다.");
        }
    } catch (error) {
        console.error("FCM 토큰 가져오기 오류:", error);
    }
};

// ✅ 토큰을 백엔드로 전송
const sendTokenToServer = async (token) => {
    await fetch("/api/save-fcm-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fcmToken: token }),
    });
};

// ✅ 푸시 알림 이벤트 리스너
onMessage(messaging, (payload) => {
    console.log("푸시 알림 수신:", payload);
    // 수신된 푸시 알림을 처리할 코드 작성 가능
});

// 토큰 요청 실행
getFCMToken();

export { messaging };