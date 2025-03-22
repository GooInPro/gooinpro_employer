// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Firebase 앱 초기화
firebase.initializeApp({
    apiKey: "AIzaSyBiJhN33LUxYB61lDYtM1ZqPbQT28XfYAs",
    authDomain: "gooinpro-beae2.firebaseapp.com",
    projectId: "gooinpro-beae2",
    storageBucket: "gooinpro-beae2.firebasestorage.app",
    messagingSenderId: "667188401130",
    appId: "1:667188401130:web:91d3d399cd82743f781893",
    measurementId: "G-HV73QKN6QG"
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
