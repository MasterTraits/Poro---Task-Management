import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Add more SDK's in the future

const firebaseConfig = {
  apiKey: "AIzaSyASprOtvxsGyam2gX7kVZN1WDlhTvsw39w",
  authDomain: "poro-8cd51.firebaseapp.com",
  projectId: "poro-8cd51",
  storageBucket: "poro-8cd51.appspot.com",
  messagingSenderId: "776666214589",
  appId: "1:776666214589:web:bfd594469aadf91bc707d4",
  measurementId: "G-L92G7XT27E"
};

// Firebase APPS 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};