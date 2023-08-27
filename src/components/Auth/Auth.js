import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../../firebase-config.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./Auth.scss";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Sign in successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Signed in with Google successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    signOut(auth, provider)
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="authentication">
      <button className="authentication__google" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      <span className="authentication__alt">or</span>
      <input
        className="authentication__email"
        placeholder="Email"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className="authentication__password"
        placeholder="Password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <button className="authentication__signin" onClick={signIn}>
        Sign In
      </button>
      <button className="authentication__forgot">Forgot Password</button>
      <Link to="/">
        <button className="authentication__logout" onClick={logOut}>
          Logout
        </button>
      </Link>
    </div>
  );
}
export default Auth;
