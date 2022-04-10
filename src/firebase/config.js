// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChpmfehYsDkup3IPhMI8PKEbTmvaFGoKY",
  authDomain: "rideshare-a919b.firebaseapp.com",
  projectId: "rideshare-a919b",
  storageBucket: "rideshare-a919b.appspot.com",
  messagingSenderId: "136994001112",
  appId: "1:136994001112:web:b69693cfd730b465ad87ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore  = getFirestore(app);

export{ projectFirestore,app }