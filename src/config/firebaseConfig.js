// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBiJhN33LUxYB61lDYtM1ZqPbQT28XfYAs",
    authDomain: "gooinpro-beae2.firebaseapp.com",
    projectId: "gooinpro-beae2",
    storageBucket: "gooinpro-beae2.firebasestorage.app",
    messagingSenderId: "667188401130",
    appId: "1:667188401130:web:91d3d399cd82743f781893",
    measurementId: "G-HV73QKN6QG"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
