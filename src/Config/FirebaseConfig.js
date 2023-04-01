import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhQ4-UEgvwf-iPdisJdKWVsJ2GOeLwi-8",
  authDomain: "factory-f1255.firebaseapp.com",
  projectId: "factory-f1255",
  storageBucket: "factory-f1255.appspot.com",
  messagingSenderId: "968249000290",
  appId: "1:968249000290:web:28cfeaf027089a313a2c3b",
  measurementId: "G-5H8Y47X55B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
