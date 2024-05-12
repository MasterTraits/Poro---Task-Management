import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Add more SDK's in the future

const firebaseConfig = {
  apiKey: "AIzaSyBMu5e5GVS8b49CMKJMK5wwPS5MlyYcT2M",
  authDomain: "poro-task-management.firebaseapp.com",
  projectId: "poro-task-management",
  storageBucket: "poro-task-management.appspot.com",
  messagingSenderId: "601230818319",
  appId: "1:601230818319:web:b4df31560b9a8ea03d777a",
  measurementId: "G-KN0PKY7M6J"
};

// Firebase APPS 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};