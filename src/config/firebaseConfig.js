// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBahF4P6wilPAoIAjQ0Xz3SrGFNHtpNmWE",
    authDomain: "gooinpro-employer.firebaseapp.com",
    projectId: "gooinpro-employer",
    storageBucket: "gooinpro-employer.firebasestorage.app",
    messagingSenderId: "751709346303",
    appId: "1:751709346303:web:7d4c80964ceb0dcdf02fca",
    measurementId: "G-LH9J5NBTKN"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
