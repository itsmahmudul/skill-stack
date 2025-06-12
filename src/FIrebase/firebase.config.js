// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWgXQd_KLlG9KKvyNAvAQOclQ-IdLhzL4",
  authDomain: "skill-stack-e19ed.firebaseapp.com",
  projectId: "skill-stack-e19ed",
  storageBucket: "skill-stack-e19ed.firebasestorage.app",
  messagingSenderId: "731488567016",
  appId: "1:731488567016:web:bbd19faf4cde443aafd35d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);