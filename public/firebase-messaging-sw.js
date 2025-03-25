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

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification?.title || '새로운 알림';
    const notificationOptions = {
        body: payload.notification?.body || '새로운 메시지가 도착했습니다.',
        icon: payload.notification?.icon || '/logo.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', function(event) {
    console.log('알림 클릭됨:', event);
    event.notification.close();

    // 클릭 시 특정 URL로 이동
    const urlToOpen = new URL('/notifications', self.location.origin).href;

    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
        .then((windowClients) => {
            // 이미 열린 창이 있는지 확인
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // 열린 창이 없으면 새 창 열기
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        });

    event.waitUntil(promiseChain);
});