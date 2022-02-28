import { initializeApp } from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAiaGbD9o2GLYlmyOzF9iYC33E_m4A6FY0",
    authDomain: "car-gallery-52b94.firebaseapp.com",
    projectId: "car-gallery-52b94",
    storageBucket: "car-gallery-52b94.appspot.com",
    messagingSenderId: "943055012909",
    appId: "1:943055012909:web:1874653aa04f0c916da4a4",
    measurementId: "G-0GLPQW2GZD"
  };
 const app = initializeApp(firebaseConfig);

 const projectStorage = app.storage;
 const projectFirestore = app.firestore;
 const timestamp ="";
 const db = getFirestore(app);

export {db, projectStorage, projectFirestore, timestamp };






