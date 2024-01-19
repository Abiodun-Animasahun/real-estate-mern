// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mern-50e76.firebaseapp.com",
  projectId: "estate-mern-50e76",
  storageBucket: "estate-mern-50e76.appspot.com",
  messagingSenderId: "539423185338",
  appId: "1:539423185338:web:66f65bc43310631833e583"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);