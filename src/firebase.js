// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIIUPs3b8OXuGNhFvoGpos6O5pDe4m9vA",
    authDomain: "admin-pannel-96ce2.firebaseapp.com",
    projectId: "admin-pannel-96ce2",
    storageBucket: "admin-pannel-96ce2.appspot.com",
    messagingSenderId: "768859322866",
    appId: "1:768859322866:web:279ed235e0ad2a29c0536b",
    measurementId: "G-1WKX1HPLM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
