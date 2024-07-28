// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnZshF2LfXR3xfgZRgHxnwfNlDjlbUhUg",
  authDomain: "netflixgpt-df4b4.firebaseapp.com",
  projectId: "netflixgpt-df4b4",
  storageBucket: "netflixgpt-df4b4.appspot.com",
  messagingSenderId: "309948505829",
  appId: "1:309948505829:web:9c004bd00fe21059583e0c",
  measurementId: "G-96MNPQ3DV9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
