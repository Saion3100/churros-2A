// 通知受け取り用 Service Worker
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2OvLcbntmnSDrWJQZf6girOjOOqBgjbY",
    authDomain: "churros-2a.firebaseapp.com",
    databaseURL: "https://churros-2a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "churros-2a",
    storageBucket: "churros-2a.firebasestorage.app",
    messagingSenderId: "1075841171997",
    appId: "1:1075841171997:web:ebb59c3d6a29743878fcf4",
    measurementId: "G-L13Z4EWKGR"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] 受信したメッセージ: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
