import "./Gratitude.scss";
import { db } from "../../firebase-config.js";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config"; // Import Firebase auth instance

function Gratitude() {
  const [registerReason, setRegisterReason] = useState("");
  const [user, setUser] = useState(null);
  const loggedUser = localStorage.getItem("user");
  const [userData, setUserData] = useState({});
  const usersCollectionRef = collection(db, "users");

  const conditionUser = userData === null ? true : false;

  useEffect(() => {
    // Check if the user is authenticated and update the `user` state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const snap = await getDoc(doc(db, "users", loggedUser));
        if (snap.exists()) {
          let data = snap.data();
          setUserData(data);
        } else {
          console.log("No such document");
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!conditionUser) {
      getUser();
    }
  }, [conditionUser, loggedUser]);

  const register = async (event) => {
    event.preventDefault();

    if (!user) {
      console.log("User is not authenticated.");
      return;
    }

    // Fetch the existing reasons array from userData
    const existingReasons = userData.reasons || [];

    // Add the new reason to the array
    const updatedReasons = [...existingReasons, registerReason];

    try {
      // Update the Firestore document with the updated reasons array
      await updateDoc(doc(db, "users", loggedUser), {
        reasons: arrayUnion(registerReason),
      });
      console.log("New reason added:", registerReason);

      // Clear the input field after adding the reason
      setRegisterReason("");
      setUserData((prevUserData) => ({
        ...prevUserData,
        reasons: updatedReasons,
      }));
    } catch (error) {
      console.error("Error adding new reason: ", error.message);
    }
  };

  if (conditionUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="gratitude">
        <Link to="/dashboard">
          <FontAwesomeIcon
            className="fa-1x gratitude__back"
            icon={icon({ name: "chevron-left", style: "solid" })}
          />
        </Link>
        <form className="gratitude__form">
          <label htmlFor="gratitude__label" className="gratitude__label">
            "Hey, what are some things that are absolutely worth living for?
            What lights up your world?"
          </label>
          <input
            className="gratitude__input"
            type="text"
            id="gratitude__label"
            name="gratitude__label"
            value={registerReason}
            onChange={(event) => {
              setRegisterReason(event.target.value);
            }}
          />

          <button className="gratitude__button" onClick={register}>
            + Add Reason
          </button>
        </form>
        <div className="gratitude__added-thoughts">
          {userData.reasons &&
            userData.reasons.map((reason, index) => (
              <div className="gratitude__added-thought" key={index}>
                {reason}
              </div>
            ))}
        </div>
        <div className="gratitude__thoughts">
          <div className="gratitude__thought">
            Kick-ass adventures and wild stories
          </div>
          <div className="gratitude__thought">
            Chilling with your ride-or-die crew
          </div>
          <div className="gratitude__thought">
            The thrill of discovering new stuff
          </div>
          <div className="gratitude__thought">Good vibes and belly laughs</div>
          <div className="gratitude__thought">
            Finding your passion and rocking it
          </div>
          <div className="gratitude__thought">Love that feels like home</div>
          <div className="gratitude__thought">
            Creating something totally unique
          </div>
        </div>
      </div>
    </>
  );
}

export default Gratitude;
