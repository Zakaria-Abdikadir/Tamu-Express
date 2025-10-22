// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
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

// Initialize Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firebase modules so other scripts can use them
export { db, auth, collection, addDoc, getDocs };
