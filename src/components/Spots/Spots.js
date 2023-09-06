import "./Spots.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Spots() {
  const [spotName, setSpotName] = useState("");
  const [spots, setSpots] = useState([]);
  const loggedUser = localStorage.getItem("user");
  const [userData, setUserData] = useState([]);
  const conditionUser = userData === null ? true : false;

  const fetchSpots = async () => {
    try {
      const spotsSnapshot = await getDocs(
        collection(db, "users", loggedUser, "spots")
      );

      const fetchedSpots = [];
      spotsSnapshot.forEach((spotDoc) => {
        fetchedSpots.push({ id: spotDoc.id, ...spotDoc.data() });
      });

      setSpots(fetchedSpots);
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
  };

  const handleAddSpot = async () => {
    try {
      // Add the new spot to the user's collection
      const userSpotsRef = collection(db, "users", loggedUser, "spots");
      await addDoc(userSpotsRef, {
        spotName,
      });

      // Fetch the updated spots and update the state
      fetchSpots();

      // Clear the input field
      setSpotName("");
    } catch (error) {
      console.error("Error adding spot:", error);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

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
                  className="fa-1x hacks__delete"
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
