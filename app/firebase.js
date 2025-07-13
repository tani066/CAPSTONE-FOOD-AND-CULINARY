// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ5rQtstprVqbDCwxCCoIGkGVPvhEoUAY",
  authDomain: "capstonesem2-3de6b.firebaseapp.com",
  projectId: "capstonesem2-3de6b",
  storageBucket: "capstonesem2-3de6b.firebasestorage.app",
  messagingSenderId: "30620072139",
  appId: "1:30620072139:web:f18d1bf5ef0eef654cc34e",
  measurementId: "G-8V5YRT48PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };


// const analytics = getAnalytics(app);