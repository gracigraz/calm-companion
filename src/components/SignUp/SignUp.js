import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config.js";
import { db } from "../../firebase-config.js"; //firestore instance

function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="signup">
      <h3 className="signup__title"> Sign up with email</h3>
      <input
        className="signup__input"
        placeholder="First Name"
        type="text"
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        className="signup__input"
        placeholder="Last Name"
        type="text"
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        className="signup__input"
        placeholder="Email"
        type="email"
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        className="signup__input"
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />

      <button className="signup__button" onClick={register}>
        {" "}
        Sign up
      </button>
    </div>
  );
}

export default SignUp;
