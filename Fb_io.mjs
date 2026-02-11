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

export { fb_initialise, fb_authenticate, fb_readRecords, fb_writeRecords};

  
  export let userDetails = {
  displayName:'n/a',
  gameName:'n/a',
  email:'n/a',
  photoUrl:'n/a',
  uid:'n/a',
  topScore: 0,
  gender:'n/a',
  age:'n/a',
};

const COL_C = 'white'; 	
const COL_B = '#CD7F32';	
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
    console.log('%cfb_initialise(): ', 
  'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const FB_GAMECONFIG = {
    apiKey: "AIzaSyCL14Sc9EDczIuW0z3HgrCMn1LillHCt68",
    authDomain: "yr-13-dc94b.firebaseapp.com",
    databaseURL: "https://yr-13-dc94b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yr-13-dc94b",
    storageBucket: "yr-13-dc94b.firebasestorage.app",
    messagingSenderId: "981036459519",
    appId: "1:981036459519:web:15816892c53f3f30b773ca"
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
  console.log('%c fb_authenticate(): ', 
  'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();
  const PROVIDER = new GoogleAuthProvider();
  PROVIDER.setCustomParameters({});

  return signInWithPopup(AUTH, PROVIDER).then((result) => {
    console.log("Autherising");
    userDetails.uid = result.user.uid
        
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    console.log(result)

    fb_writeRecords("userDetails/" + userDetails.uid, userDetails);
  })
  .catch((error) => {
    console.log("error Autherising");
  });
  }

function fb_Logout() {
  console.log('%c fb_Logout(): ', 
  'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();
    signOut(AUTH).then(() => {
        console.log("Loged out")
        window.location.href = '/index.html';
        sessionStorage.clear();
    })
    .catch((error) => {
      console.log("Loged out error")
    });
}

///////////////////////////////////
//Name:fb_writeRecords(pathkey, data)
//When: fb_adminCommands(); || fb_registerDetails(); || bd.mjs
//Job: writes data to location in database
//Input: (pathKey, (location in database)) (data, (data to write))
//Output: Returns when done
////////////////////////////////
function fb_writeRecords(pathKey, data) {
  console.log('%c fb_writeRecords(): ', 
  'color: ' + COL_C + '; background-color: ' + COL_B + ';');     	
  const REF = ref(getDatabase(), pathKey);
  console.log("writing: " + data + "  To " + pathKey)  
    return set(REF, data).then(() => {
        console.log("Set :)")
    }).catch((error) => {
        console.log("error" + " :(")
    });
}

///////////////////////////////////
//Name:fb_readRecords(pathKey)
//When: fb_authenticate(); || fb_registerDetails()|; || fb_attemptLogIn(); || bd.mjs || gameSelecetion.mjs
//Job: reads data from location in database
//Input: (pathKey, (location in database))
//Output: returns data from location
////////////////////////////////

function fb_readRecords(pathKey) {
  console.log('%c fb_readRecords(): ', 
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');

  const dbReference = ref(getDatabase(), pathKey);
  console.log("getting info from", pathKey);

  return get(dbReference)
    .then((snapshot) => {
      if (snapshot.val() != null) {
        console.log("Snapshot value:", snapshot.val());
        return snapshot;
      } else {
        console.log("No data found.");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


///////////////////////////////////
//Name:fb_sortedRead()
//When: gameSelection.mjs
//Job: To read from a location and return a sorted array
//Input: (pathKey, (location in database))
//Output: Sorted Array
////////////////////////////////
function fb_sortedRead(pathKey) {
  console.log('%c fb_sortedRead(): ', 
  'color: ' + COL_C + '; background-color: ' + COL_B + ';');

  const dbReference = query(ref(getDatabase(), pathKey), orderByValue());
  return get(dbReference).then((snapshot) => {
    const SORTED = []
    if (snapshot.exists()) {
      snapshot.forEach((_child) => {
        SORTED.push({key: _child.key, value: _child.val()})})
        return SORTED.reverse();
    } else {
    console.log("Nothing to sort");
  }
  }).catch((error) => {
    console.log(error);
  });
}

///////////////////////////////////
//Name:fb_attemptLogIn()
//When: main.mjs
//Job: To attempt to log in, if not registered go to registration page
//Input: N/A
//Output:N/A
////////////////////////////////
function fb_attemptLogIn() {
  console.log('%c fb_attemptLogIn(): ', 
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');

  fb_authenticate().then((active) => {
    if (active == true){
      fb_readRecords("/userDetails/" + userDetails.uid).then((snapshot) => {
        userDetails = snapshot.val();
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
        window.location.href = '/pages/gameSelection/gameSelection.html';
      })
    } else {
      window.location.href = 'pages/registration/registration.html';
    }
  })
}

///////////////////////////////////
//Name:fb_registerDetails()
//When: registration.mjs
//Job: to write the data from the registartion page to userDetails in the database
//Input: (gameName, (userDetails.gameName)) (age, (userDetails.age)) (gender, (userDetails.gender))
//Output:N/A
////////////////////////////////
function fb_registerDetails(gameName, age, gender){
  console.log('%c fb_registerDetails(): ', 
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    userDetails.gameName = gameName;
    userDetails.age = age;
    userDetails.gender = gender;
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    fb_writeRecords("userDetails/" + userDetails.uid, userDetails).then(() => {
    window.location.href = "/pages/gameSelection/gameSelection.html"
    })
}

///////////////////////////////////
//Name:fb_adminCommands()
//When: admin.mjs
//Job: To execute a command depending on params
//Input: (command, (The type of command)) (pathKey, (location in database)) (data, (what data to write))
//Output:N/A
////////////////////////////////
function fb_adminCommands(command, pathKey, data){
  console.log('%c fb_adminCommands(): ', 
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    console.log(command)
    if(command == "read"){
      fb_readRecords(pathKey).then((snapshot) => {
        alert(JSON.stringify(snapshot.val(), null, 2));
      })
    } else if(command == "write"){
      fb_writeRecords(pathKey, data)
      alert("Wrote " + data + " to " + pathKey)
    }
}
/**************************************************************/
// END OF CODE
/**************************************************************/
