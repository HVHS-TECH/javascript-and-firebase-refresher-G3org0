  // Import the functions you need from the SDKs you need
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

export { fb_initialise, fb_authenticate};


  const firebaseConfig = {
    apiKey: "AIzaSyCL14Sc9EDczIuW0z3HgrCMn1LillHCt68",
    authDomain: "yr-13-dc94b.firebaseapp.com",
    databaseURL: "https://yr-13-dc94b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yr-13-dc94b",
    storageBucket: "yr-13-dc94b.firebasestorage.app",
    messagingSenderId: "981036459519",
    appId: "1:981036459519:web:15816892c53f3f30b773ca"
  };

  
/**************************************************************/
// Functions
/**************************************************************/
  ///////////////////////////////////
  //Name:fb_initialise()
  //When: main.mjs
  //Job: estableshes connection with firebase
  //Input: N/A
  //Output:N/A
  ////////////////////////////////
  function fb_initialise() {
    console.log('fb_initialise():');
    const FB_GAMECONFIG = {
      apiKey: "AIzaSyAzZNYkhvc3Jil5cxwUYZEv-t-fP0ZwR0s",
      authDomain: "comp-2025-george-taylor.firebaseapp.com",
      databaseURL: "https://comp-2025-george-taylor-default-rtdb.firebaseio.com",
      projectId: "comp-2025-george-taylor",
      storageBucket: "comp-2025-george-taylor.firebasestorage.app",
      messagingSenderId: "869054825808",
      appId: "1:869054825808:web:66e65a5f7922a5c11dd855",
      measurementId: "G-LXDGSSYJ0N"
    };
    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
  }

///////////////////////////////////
//Name:fb_authenticate()
//When: fb_attemptLogIn()
//Job: opens pop for account authetafication, reads if user is registered and returns true or false
//Input: N/A
//Output: if user is registerd in database (true/false)
////////////////////////////////
function fb_authenticate(){
  console.log('%c fb_authenticate()');
  const AUTH = getAuth();
  const PROVIDER = new GoogleAuthProvider();
  PROVIDER.setCustomParameters({});

  return signInWithPopup(AUTH, PROVIDER).then((result) => {
    console.log("Autherising");
    userDetails.displayName = result.user.displayName
    userDetails.email = result.user.email
    userDetails.photoUrl = result.user.photoURL
    userDetails.uid = result.user.uid
    fb_readRecords("adminUsers/" + userDetails.uid).then((snapshot) => {
      adminVal = (snapshot != null);
      sessionStorage.setItem("adminVal", adminVal);
      console.log(JSON.parse(sessionStorage.getItem("adminVal")));
    });
        
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    console.log(result)
    return fb_readRecords("userDetails/" + userDetails.uid).then((snapshot) => {
    return snapshot !== null;
  })
  .catch((error) => {
    console.log("error");
  });
  })
}
