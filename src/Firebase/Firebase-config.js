import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAcj8rhzzuGr7L8RbqdB3AyUQws3W5xZ3g",
  authDomain: "github-repositories-app.firebaseapp.com",
  projectId: "github-repositories-app",
  storageBucket: "github-repositories-app.appspot.com",
  messagingSenderId: "952430845593",
  appId: "1:952430845593:web:6c7aa49ba4efef677e2208",
};

// Initialize Firebase and Firestore
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
