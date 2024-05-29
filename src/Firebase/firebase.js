// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIREBASE,
  authDomain: "tip-a-tweet.firebaseapp.com",
  projectId: "tip-a-tweet",
  storageBucket: "tip-a-tweet.appspot.com",
  messagingSenderId: "884623357517",
  appId: "1:884623357517:web:a3caebbe1fc633c2144e04",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
