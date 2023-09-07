import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase-config.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./Auth.scss";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Auth() {
  //state variables for managing the email and password input tags
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //hook from react that allows us to  navigate to different routes

  //function called when signin button is clicked
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password) //used to sign in with the user's provided email and password.
      //if sign-in is successful:
      .then((userCredential) => {
        //the users unique id userCredential.user.uid is extracted and stored in local storage,
        //this way the application remembers the users identity between sessions
        let user = userCredential.user.uid;
        localStorage.setItem("user", user);
        console.log("Sign in successfully");
        navigate("/dashboard");
      })
      //else any errors are catched here
      .catch((error) => {
        console.error(error);
      });
  };

  //function called when signed in with google button is clicked
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); //from firebase authentication opens googlesignin popup
      console.log("Signed in with Google successfully");
      cookies.set("auth-token", result.user.refreshToken);
      navigate("/dashboard");
      console.log("Navigating to /dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authentication">
      <Link className="authentication__link" to="/">
        <h3 className="authentication__exit">X</h3>
      </Link>
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
    </div>
  );
}
export default Auth;
