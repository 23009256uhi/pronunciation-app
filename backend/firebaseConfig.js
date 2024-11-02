// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMFkZqKLUjz7WxQQHPXaUu1vbjd2vSSY0",
  authDomain: "pronunciation-3f18a.firebaseapp.com",
  projectId: "pronunciation-3f18a",
  storageBucket: "pronunciation-3f18a.appspot.com",
  messagingSenderId: "527667004727",
  appId: "1:527667004727:web:f5b93aa5d3c1db663946b2",
  measurementId: "G-6445Q1P2K8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
