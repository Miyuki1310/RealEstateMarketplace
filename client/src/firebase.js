// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-1078b.firebaseapp.com",
  projectId: "real-estate-1078b",
  storageBucket: "real-estate-1078b.firebasestorage.app",
  messagingSenderId: "959550704562",
  appId: "1:959550704562:web:b1c72e8770e6c73850f2ab",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
