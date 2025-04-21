import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, Database } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF88C2xzAkyQYzG2S4XQrMTpmY_7GYw6I",
  authDomain: "heisenberg-b4608.firebaseapp.com",
  databaseURL: "https://heisenberg-b4608-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "heisenberg-b4608",
  storageBucket: "heisenberg-b4608.firebasestorage.app",
  messagingSenderId: "707937071538",
  appId: "1:707937071538:web:08de581e16ea1b41e474ab",
  measurementId: "G-SFTF7YFB8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

export { database };
