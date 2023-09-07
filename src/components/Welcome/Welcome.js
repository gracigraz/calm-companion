import "./Welcome.scss";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <main className="welcome">
        <h1 className="welcome__title">Calm Companion</h1>
        <div className="welcome__container">
          <p className="welcome__intro">
            Welcome to the app for anonymous sharing mental health stories,
            tools, and crisis support. Overcome negative thoughts—now!
          </p>
        </div>
        <div className="welcome__buttons">
          <Link to="/signup">
            <button className="welcome__button welcome__button--left">
              Join Now
            </button>
          </Link>
          <Link to="/login">
            <button className="welcome__button">Log In</button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Welcome;
