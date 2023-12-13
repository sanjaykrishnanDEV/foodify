// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdSjrvAtcPXOoTEGaInGykDZ265IpdgDQ",
  authDomain: "foodapp-82f17.firebaseapp.com",
  databaseURL: "https://foodapp-82f17-default-rtdb.firebaseio.com",
  projectId: "foodapp-82f17",
  storageBucket: "foodapp-82f17.appspot.com",
  messagingSenderId: "938114255481",
  appId: "1:938114255481:web:7c954d5b4da9dc1f0fe2a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getDatabase(app)
