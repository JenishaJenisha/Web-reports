// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5EotU4EB8fHIlh2ewtF8qDPYVSyF57ME",
  authDomain: "js-web-reports.firebaseapp.com",
  projectId: "js-web-reports",
  storageBucket: "js-web-reports.firebasestorage.app",
  messagingSenderId: "142052549092",
  appId: "1:142052549092:web:26b691154b33803135e7f1",
  measurementId: "G-8R5JMMP8FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);