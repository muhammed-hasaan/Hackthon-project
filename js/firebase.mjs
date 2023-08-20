import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRYYh2yL59wCC8nFXszM3ogWyOJfALBxs",
  authDomain: "hasaan-hackthon.firebaseapp.com",
  projectId: "hasaan-hackthon",
  storageBucket: "hasaan-hackthon.appspot.com",
  messagingSenderId: "986003560341",
  appId: "1:986003560341:web:4114e8b327e4d806e6c89c",
  measurementId: "G-3Z1LB9D6CJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };