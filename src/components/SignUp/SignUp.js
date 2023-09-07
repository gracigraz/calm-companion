import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config.js"; // Import both auth and firestore instances
import {
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./SignUp.scss";

function SignUp() {
  const navigate = useNavigate();

  //state variables include registerEmail, registerPassword, registerName, and registerLastName, are used to store the user's email, password, first name, and last name, respectively.
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");

  const usersCollectionRef = collection(db, "users"); //grabbing the users collection form the db and asigning it to usersCollectionRef, collection function we need to import from the firestore, now we can make queries to the users collection

  // the register function is called when the signup button is clicked.
  const register = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword) //(from firebase authentication) is used to create a new user account with the provided email and password.
      //if the account is created successfully, it retrieves the user's unique ID (userID) and uses setDoc to create a new document in the firebase firestore users collection with their first name, last name, email, and UID.
      .then((userCredential) => {
        const userID = userCredential.user.uid;
        setDoc(doc(db, "users", userID), {
          firstName: registerName,
          lastName: registerLastName,
          email: registerEmail,
          uid: userID,
        });

        alert("User registered"); //alert to show registration successful
        navigate("/login"); //takes you to login page after successful registration
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="signup">
      <Link className="signup__link" to="/">
        <h3 className="signup__exit">X</h3>
      </Link>
      <h4 className="signup__title"> Enter your details to sign up</h4>
      <div className="signup__name-container">
        <input
          className="signup__input signup__input--smaller"
          placeholder="First Name"
          type="text"
          value={registerName} // this allows real-time updates of the state variables as the user types in their name in this case
          onChange={(event) => {
            setRegisterName(event.target.value);
          }}
        />
        <input
          className="signup__input signup__input--smaller"
          placeholder="Last Name"
          type="text"
          value={registerLastName} // this allows real-time updates of the state variables as the user types in their last name in this case
          onChange={(event) => {
            setRegisterLastName(event.target.value);
          }}
        />
      </div>
      <input
        className="signup__input"
        placeholder="Email"
        type="email"
        value={registerEmail} // Binding the value to the state variable
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        className="signup__input"
        placeholder="Password"
        type="password"
        value={registerPassword} // Binding the value to the state variable
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <button className="signup__button" onClick={register}>
        Sign up
      </button>
    </div>
  );
}

export default SignUp;
