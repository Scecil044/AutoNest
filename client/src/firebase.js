// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "autonestkenya.firebaseapp.com",
  projectId: "autonestkenya",
  storageBucket: "autonestkenya.appspot.com",
  messagingSenderId: "25530474735",
  appId: "1:25530474735:web:bb69a9b521d1d2e95abb1a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
