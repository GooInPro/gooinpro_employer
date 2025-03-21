// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Firebase 앱 초기화
firebase.initializeApp({
    apiKey: "AIzaSyBahF4P6wilPAoIAjQ0Xz3SrGFNHtpNmWE",
    authDomain: "gooinpro-employer.firebaseapp.com",
    projectId: "gooinpro-employer",
    storageBucket: "gooinpro-employer.firebasestorage.app",
    messagingSenderId: "751709346303",
    appId: "1:751709346303:web:7d4c80964ceb0dcdf02fca",
    measurementId: "G-LH9J5NBTKN"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = '새로운 알림';
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
