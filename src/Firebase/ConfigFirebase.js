// src/Firebase/ConfigFirebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // cuando lo actives

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);





 // apiKey: "AIzaSyDHCj-Tn78asKoIC-aNHqJJsqeEcKuspdc",
 // authDomain: "pfg2-munozsergio-ramossantiago.firebaseapp.com",
  //projectId: "pfg2-munozsergio-ramossantiago",
  //storageBucket: "pfg2-munozsergio-ramossantiago.firebasestorage.app",
  //messagingSenderId: "808626790905",
  //appId: "1:808626790905:web:053cd40f1079b251ecdd28"