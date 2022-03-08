import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxAafXLLqGiDTS7Qs5o2T9PhpecTS6pqI",
  authDomain: "project-3f575.firebaseapp.com",
  projectId: "project-3f575",
  storageBucket: "project-3f575.appspot.com",
  messagingSenderId: "1008381209321",
  appId: "1:1008381209321:web:766188a735ccf2c2ddde78"
};
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


const db = getFirestore();

export {db, projectStorage, projectFirestore, timestamp };