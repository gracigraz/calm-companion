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

function Toolkit() {
  const handleHacks = () => {
    window.location.href = "/hacks";
  };
  const handleGratitude = () => {
    window.location.href = "/gratitude";
  };
  const handleCompanions = () => {
    window.location.href = "/companions";
  };
  const handleSpots = () => {
    window.location.href = "/myspots";
  };

  return (
    <>
      <main className="toolkit">
        <div className="toolkit__container">
          <div className="toolkit__banner" onClick={handleHacks}>
            <h4 className="toolkit__title toolkit__title--hacks">
              Keep-calm hacks
            </h4>
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
