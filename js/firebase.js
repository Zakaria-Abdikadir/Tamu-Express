// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBVfsiuuNkV2rDiHpEpbbyZeqR3CKxYnSc",
  authDomain: "tamu-express.firebaseapp.com",
  projectId: "tamu-express",
  storageBucket: "tamu-express.firebasestorage.app",
  messagingSenderId: "824065764709",
  appId: "1:824065764709:web:ff26ba041f1bd2f205858c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
