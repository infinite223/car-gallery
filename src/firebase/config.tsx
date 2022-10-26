import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDj1OvxOY_JqFHUDArp4_KVLqLuD6iaxLo",
  authDomain: "car-gallery-3d463.firebaseapp.com",
  projectId: "car-gallery-3d463",
  storageBucket: "car-gallery-3d463.appspot.com",
  messagingSenderId: "238419076873",
  appId: "1:238419076873:web:85dc11d510e7e4e97715d8"
};
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


const db = getFirestore();

export {db, projectStorage, projectFirestore, timestamp };