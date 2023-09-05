import "./Mood.scss";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  serverTimestamp, //function from firebase that creates a timestamp
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Mood() {
  const [mood, setMood] = useState(0);
  const loggedUser = localStorage.getItem("user");
  const [userData, setUserData] = useState([]);

  const usersCollectionRef = collection(db, "users");
  const conditionUser = userData === null ? true : false;

  const handleMoodChange = (newMood) => {
    // Calculate the width as a percentage
    const progressWidth = `${newMood}%`;
    setMood(progressWidth);
  };
  const moodClick = async () => {
    const moodChange = mood;
    setUserData({
      ...userData,
      mood: moodChange,
      createdAt: serverTimestamp(),
    });
    console.log(setUserData);

    try {
      const userDoc = doc(db, "users", loggedUser);
      console.log(userDoc);

      // Save the mood to Firebase Firestore
      await updateDoc(userDoc, {
        mood: moodChange,
        createdAt: serverTimestamp(),
      });
      console.log("Mood saved to Firebase:", mood);
    } catch (error) {
      console.log("Error saving mood: ", error);
    }
    if (moodChange > 80) {
      alert("Glad to hear you are feeling amazing!");
    } else if (moodChange > 60 && moodChange <= 80) {
      alert("Keep up the good work!");
    } else if (moodChange > 40 && moodChange <= 60) {
      alert("Keep pushing forward! You're making progress!");
    } else if (moodChange > 20 && moodChange <= 40) {
      alert("Better days are coming! Hang in there!");
    } else {
      alert("Remember, every cloud has a silver lining. Let's go!");
    }

    // Reset the mood to 0 after saving
    setMood(0);
  };

  const handleExit = async () => {
    setMood(0);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const snap = await getDoc(doc(db, "users", loggedUser));
        if (snap.exists()) {
          let data = snap.data();
          setUserData(data);
          console.log(userData);
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
    <div className="mood">
      {/* <p>Current User {loggedUser}</p> */}
      <h4 className="mood__title">How are you today?!</h4>
      <div className="mood__container">
        <div className="mood__progress-container">
          <div className="mood__progress-bar" style={{ width: mood }}></div>
        </div>

        <div className="mood__buttons">
          <button
            className="mood__button mood__button--level1"
            onClick={() => handleMoodChange(20)}
          >
            Awful
          </button>
          <button
            className="mood__button mood__button--level2"
            onClick={() => handleMoodChange(40)}
          >
            Bad
          </button>
          <button
            className="mood__button mood__button--level3"
            onClick={() => handleMoodChange(60)}
          >
            Fine
          </button>
          <button
            className="mood__button mood__button--level4"
            onClick={() => handleMoodChange(80)}
          >
            Good
          </button>
          <button
            className="mood__button mood__button--level5"
            onClick={() => handleMoodChange(100)}
          >
            Amazing
          </button>
        </div>
        <div className="mood__states">
          <button className="mood__save" onClick={moodClick}>
            Save
          </button>
          <FontAwesomeIcon
            className="mood__refresh"
            onClick={handleExit}
            icon={icon({ name: "rotate-right", style: "solid" })}
          />
        </div>
      </div>
    </div>
  );
}
export default Mood;
