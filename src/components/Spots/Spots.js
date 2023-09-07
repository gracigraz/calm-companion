import "./Spots.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; //for managing state and side effects
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Spots() {
  const [spotName, setSpotName] = useState(""); //state variable used to track the name of the hangout spot entered by the user
  const [spots, setSpots] = useState([]); //array where we store the list of hangout spots fetched from firebase firestore
  const loggedUser = localStorage.getItem("user"); //gets the user identifier from the local storage
  const [userData, setUserData] = useState([]); // used to store user data gotten from firebase dabatase

  const conditionUser = userData === null ? true : false; // used to check if userData is null tells us if the user data is still being loaded

  // function that gets the list of spots for the current user from database
  const fetchSpots = async () => {
    try {
      const spotsSnapshot = await getDocs(
        collection(db, "users", loggedUser, "spots")
      );

      const fetchedSpots = [];
      spotsSnapshot.forEach((spotDoc) => {
        fetchedSpots.push({ id: spotDoc.id, ...spotDoc.data() });
      });

      setSpots(fetchedSpots); //updates the spots state variable
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
  };
  //adds a new spot to the user's collection in the database
  const handleAddSpot = async () => {
    try {
      // Add the new spot to the user's collection
      const userSpotsRef = collection(db, "users", loggedUser, "spots");
      await addDoc(userSpotsRef, {
        spotName,
      });

      // Fetch the updated spots and update the state
      fetchSpots();

      // Clear the input field after adding a spot
      setSpotName("");
    } catch (error) {
      console.error("Error adding spot:", error);
    }
  };
  // gets the user's hangout spots when the component is first mounted
  useEffect(() => {
    fetchSpots();
  }, []);
  //deletes a specific hangout spot by its ID from the user's collection
  const handleDeleteSpot = async (spotId) => {
    try {
      const userSpotsRef = doc(db, "users", loggedUser, "spots", spotId);
      await deleteDoc(userSpotsRef);

      // Fetch the updated spots and update the state
      fetchSpots();
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };

  //gets the user's data when the component is mounted and whenever conditionUser variable changes=
  useEffect(() => {
    const getUser = async () => {
      try {
        const snap = await doc(db, "users", loggedUser);
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
    getUser();
  }, [conditionUser]);

  if (conditionUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="spots">
        <Link to="/dashboard">
          <FontAwesomeIcon
            className="fa-1x spots__exit"
            icon={icon({ name: "chevron-left", style: "solid" })}
          />
        </Link>
        <div className="spots__container">
          <h3 className="spots__title">
            Your top hangout spots where you can chill and shift your focus from
            worries!
          </h3>

          <input
            className="spots__input"
            placeholder="Name"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
          />
          <button className="spots__add" onClick={handleAddSpot}>
            + Add Spot
          </button>

          <div className="spots__list">
            {spots.map((spot) => (
              <div key={spot.id} className="spots__spot">
                {spot.spotName}
                <FontAwesomeIcon
                  className="fa-1x spots__delete"
                  icon={icon({ name: "trash", style: "solid" })}
                  onClick={() => handleDeleteSpot(spot.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Spots;
