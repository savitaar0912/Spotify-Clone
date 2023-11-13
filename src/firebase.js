// compat packages are API compatible with namespaced code
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_5NGMRbGtBSTMNmgg4Q-V9PHjPQ1a3Z4",
    authDomain: "spotify-3b610.firebaseapp.com",
    projectId: "spotify-3b610",
    storageBucket: "spotify-3b610.appspot.com",
    messagingSenderId: "932901592450",
    appId: "1:932901592450:web:c2c6381a8ffcd7cc57c39b",
    measurementId: "G-NCYGP1ZNT3"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// You can get Firebase services like this:
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
