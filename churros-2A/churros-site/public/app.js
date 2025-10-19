// Firebase 初期化
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messaging = getMessaging(app);

// 現在番号の参照
const currentRef = ref(db, 'currentNumber');

// 通知トークンを取得して登録（お客さん側で使う）
export async function registerForPushNotifications(userNumber) {
    try {
        const token = await getToken(messaging, { vapidKey: "あなたの VAPID キー" });
        console.log("トークン取得:", token);
        if (token) {
            // トークンを DB に保存／更新（例：tokens/番号 → トークン）
            await set(ref(db, `tokens/${userNumber}`), token);
        }
    } catch (err) {
        console.error("トークン取得に失敗:", err);
    }
}

// 通知を受け取ったときの処理（フォアグラウンド時）
onMessage(messaging, (payload) => {
    console.log("onMessage 受信:", payload);
    // ここで UI に通知を表示するなど
});

export { currentRef };
