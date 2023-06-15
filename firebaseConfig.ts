// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArzzfAMCCrMwNf7tlPhx0S4pS0tyFfxSE",
  authDomain: "fireapp-2f562.firebaseapp.com",
  projectId: "fireapp-2f562",
  storageBucket: "fireapp-2f562.appspot.com",
  messagingSenderId: "502648405996",
  appId: "1:502648405996:web:8b9561bf15ec78c6404ac9",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const GOOGLE_AUTH_PROVIDER = new GoogleAuthProvider();
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
