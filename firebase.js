import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDtOGh5KQFWYY6xsKYEn_-el4-q370MOME",
  authDomain: "rent-me-183b4.firebaseapp.com",
  projectId: "rent-me-183b4",
  storageBucket: "rent-me-183b4.appspot.com",
  messagingSenderId: "455505220850",
  appId: "1:455505220850:web:ea263a9163d4437a656c6b",
  measurementId: "G-5BBQXRWVGE"
};

// Initialize Firebase
export const app = getApps.length > 0 ? getApp() : initializeApp({...firebaseConfig,  });
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
