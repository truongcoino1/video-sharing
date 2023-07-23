import * as firebase from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdTmgZEeFcRSIVtqBr_aYfSkyEGyHj_7M",
  authDomain: "video-sharing-b3ca1.firebaseapp.com",
  projectId: "video-sharing-b3ca1",
  storageBucket: "video-sharing-b3ca1.appspot.com",
  messagingSenderId: "347991904155",
  appId: "1:347991904155:web:9fe0187e6c7d32e93c1b3e",
  measurementId: "G-XT4CG9CSM0"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);