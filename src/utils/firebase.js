// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; 

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrGRtt20zSn2UMAwoYYh8q_NfB3sPGeUk",
  authDomain: "movie-ticket-booking-5c7ee.firebaseapp.com",
  projectId: "movie-ticket-booking-5c7ee",
  storageBucket: "movie-ticket-booking-5c7ee.appspot.com",
  messagingSenderId: "273630801375",
  appId: "1:273630801375:web:590fb85cb5aedc19b4286a",
  measurementId: "G-DEC51W97TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Firestore instance

export { db, collection, getDocs, addDoc }; // ✅ Export Firestore functions
