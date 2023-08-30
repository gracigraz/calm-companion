import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase-config.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./Auth.scss";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Auth(props) {
  const { setIsAuth } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = () => {
    console.log("See me?");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        let user = userCredential.user.uid;
        localStorage.setItem("user", user);
        console.log("Sign in successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    try {
      console.log(result);
      console.log("Signed in with Google successfully");
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true); //is set to true when ever you log in
    } catch (error) {
      console.log(error);
    }
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
