import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config.js"; // Import database firestore instance
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./Toolkit.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

function Toolkit() {
  const backgroundStyle = {
    backgroundImage: `url("../../assets/icons/user-plus-solid.svg")`, // Replace with your image path
  };
  const handleHacks = () => {
    window.location.href = "/hacks";
  };
  const handleGratitude = () => {
    window.location.href = "/gratitude";
  };
  const handleCompanions = () => {
    window.location.href = "/mycontacts";
  };
  const handleSpots = () => {
    window.location.href = "/myspots";
  };

  return (
    <>
      <main className="toolkit">
        <div className="toolkit__container">
          <div
            className="toolkit__banner"
            style={backgroundStyle}
            onClick={handleHacks}
          >
            <h4 className="toolkit__title toolkit__title--hacks">
              <FontAwesomeIcon icon={faUserPlus} style={{ color: "#595e60" }} />
              Keep-calm hacks
            </h4>
            <FontAwesomeIcon icon={faUserPlus} style={{ color: "#595e60" }} />
          </div>
          <div className="toolkit__banner" onClick={handleGratitude}>
            <h4 className="toolkit__title toolkit__title--gratitude">
              Grounds for Gratitude
            </h4>
          </div>
          <div className="toolkit__banner" onClick={handleCompanions}>
            <h4 className="toolkit__title toolkit__title--companions">
              Close Companions
            </h4>
          </div>
          <div className="toolkit__banner" onClick={handleSpots}>
            <h4 className="toolkit__title toolkit__title--spots">
              Diversion Spots{" "}
            </h4>
          </div>
        </div>
      </main>
    </>
  );
}

export default Toolkit;
