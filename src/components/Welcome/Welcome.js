import "./Welcome.scss";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <h1>Calm Companion</h1>
      <div>
        Welcome to the app for anonymous sharing mental health stories, tools,
        and crisis support. Overcome negative thoughts—now!
      </div>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Log in with account</button>
      </Link>
    </>
  );
}

export default Welcome;
