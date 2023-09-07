import Mood from "../../components/Mood/Mood";
import Toolkit from "../../components/Toolkit/Toolkit";
import Nav from "../../components/Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, provider } from "../../firebase-config.js";
import "./DashboardPage.scss";

function DashboardPage() {
  //function that handles user logout, uses the signOut function from Firebase's authentication module (auth) to sign the user out.
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
    <>
      <main className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Hey Friend! </h1>
          <Link to="/">
            <FontAwesomeIcon
              className="fa-1x dashboard__logout"
              onClick={logOut}
              icon={icon({ name: "arrow-right-from-bracket", style: "solid" })}
            />
          </Link>
        </div>
        <div className="dashboard__container">
          <p className="dashboard__intro">
            Just so you know – every time you make an entry in your log, you're
            moving a bit closer to feeling awesome again. You got this! 😉
          </p>
          <Mood />
          <Toolkit />
        </div>
      </main>
      <Nav />
    </>
  );
}

export default DashboardPage;
