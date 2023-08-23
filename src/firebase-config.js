// here anything related to conecting to the database, to the project itself and to firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //the function we call to create the conection, it takes a firebaseConfig object
import { getFirestore } from "@firebase/firestore"; //connect our firestore database to react app

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  measurementId: REACT_APP_measurementId,
};

//establishing the database conection, however this doesn't guarantee a database, in order to do this we need to create our firebase database in firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //we pass the app to getFIrestore that it is goign to populate db, all of the firebaseinformation to that app, we need to access the db variable outsie of this file to make the queries, we add stuff to the database  so we export it
