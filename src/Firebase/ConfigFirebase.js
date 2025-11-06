import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // despues lo descomento cuando active Storage

const firebaseConfig = {
  apiKey: "AIzaSyDHCj-Tn78asKoIC-aNHqJJsqeEcKuspdc",
  authDomain: "pfg2-munozsergio-ramossantiago.firebaseapp.com",
  projectId: "pfg2-munozsergio-ramossantiago",
  storageBucket: "pfg2-munozsergio-ramossantiago.firebasestorage.app",
  messagingSenderId: "808626790905",
  appId: "1:808626790905:web:053cd40f1079b251ecdd28"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// export const storage = getStorage(app); // esto tambien lo descomento despues de activar Storage

export default app;
