// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// This is a public configuration and is safe to expose.
const firebaseConfig = {
  "projectId": "evolv-ai-agency",
  "appId": "1:420649665368:web:1cbb8c55c4f9a1c5a39b2d",
  "storageBucket": "evolv-ai-agency.firebasestorage.app",
  "apiKey": "AIzaSyABz5WpEbYwW4hlWzj5omzsLMtyZ2oZoUo",
  "authDomain": "evolv-ai-agency.firebaseapp.com",
  "messagingSenderId": "420649665368"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
