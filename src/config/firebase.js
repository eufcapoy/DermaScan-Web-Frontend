// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPYcsFai2dHZwOwOpo-7qDGAk9v_S2dVM",
  authDomain: "dermascan-c5c10.firebaseapp.com",
  projectId: "dermascan-c5c10",
  storageBucket: "dermascan-c5c10.firebasestorage.app",
  messagingSenderId: "2856932159",
  appId: "1:2856932159:web:72db5388d9a76d6951398a",
  measurementId: "G-PSENNTL402",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;