  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');

  // Your web app's Firebase configuration
  import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut,  }
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { initializeApp }
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  
import { getDatabase, ref, set, get, update, query, orderByChild, limitToFirst, orderByValue }
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCL14Sc9EDczIuW0z3HgrCMn1LillHCt68",
    authDomain: "yr-13-dc94b.firebaseapp.com",
    databaseURL: "https://yr-13-dc94b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yr-13-dc94b",
    storageBucket: "yr-13-dc94b.firebasestorage.app",
    messagingSenderId: "981036459519",
    appId: "1:981036459519:web:15816892c53f3f30b773ca"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);