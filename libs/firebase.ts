// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR9ohkpmMB8Ts5w-0SIubYWD0pIw8hnTA",
  authDomain: "thakur-e-shop.firebaseapp.com",
  projectId: "thakur-e-shop",
  storageBucket: "thakur-e-shop.appspot.com",
  messagingSenderId: "970599539570",
  appId: "1:970599539570:web:0b671f3c3713504abaf3eb",
  measurementId: "G-HZXYRZWBGV",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
                          