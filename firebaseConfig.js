// firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwyNuT62axItBXF-bdGkaxDviaR2LZDwc",
  authDomain: "task-manager-app-cf2b2.firebaseapp.com",
  projectId: "task-manager-app-cf2b2",
  storageBucket: "task-manager-app-cf2b2.appspot.com",
  messagingSenderId: "758322842593",
  appId: "1:758322842593:web:6f6e0ad1eade2727b720a0",
  measurementId: "G-CDM7JW82JV",
};

var app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // If no app exists.
} else {
  const APPS = getApps();
  app = APPS[0]; // Choose the first app from the array.
}

export const db = getDatabase(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
