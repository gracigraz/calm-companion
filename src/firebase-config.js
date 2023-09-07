// here anything related to conecting to the database, to the project itself and to firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //the function we call to create the conection, it takes a firebaseConfig object
import { getFirestore } from "@firebase/firestore"; //connect our firestore database to react app
import { getAuth, GoogleAuthProvider } from "@firebase/auth"; //sets up authentication in this project

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

//establishing the database conection, however this doesn't guarantee a database, in order to do this we need to create our firebase database in firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //we pass the app to getFIrestore that it is goign to populate db, all of the firebaseinformation to that app, we need to access the db variable outsie of this file to make the queries, we add stuff to the database  so we export it
export const auth = getAuth(app); //getAuth used whenever you want to have authentication in your project, passing the app were you are wanted to pass authentication
export const provider = new GoogleAuthProvider(); //tells firebase you want to handle your authentication using google
