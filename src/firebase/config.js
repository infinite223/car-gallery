import { initializeApp } from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_2BCUUrz8bDD9ODx9viyuGadzrjw7rsA",
  authDomain: "car-galleryv2.firebaseapp.com",
  projectId: "car-galleryv2",
  storageBucket: "car-galleryv2.appspot.com",
  messagingSenderId: "195384992128",
  appId: "1:195384992128:web:f1dd4f27fe22c34fc62165"
  };
 const app = initializeApp(firebaseConfig);

 const projectStorage = app.storage;
 const projectFirestore = app.firestore;
 const timestamp ="";
 const db = getFirestore(app);

export {db, projectStorage, projectFirestore, timestamp };






