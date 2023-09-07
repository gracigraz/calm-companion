import "./Mood.scss";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDoc,
  doc,
  serverTimestamp, //function from firebase that creates a timestamp
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Mood() {
  const [mood, setMood] = useState(0); //state variable to track the mood level, initialized to 0
  const loggedUser = localStorage.getItem("user"); //retrieves a user identifier from the browser's local storage. This is what allows us to associate the mood data with a specific user
  const [userData, setUserData] = useState([]); //state varibale used to to store the user's data fetched from firebase. it is initialized to an aempty array

  const usersCollectionRef = collection(db, "users"); //reference to the user's collection in firebase
  const conditionUser = userData === null ? true : false; //checks if userData is null, if true a message "Loading.." appears on the screen

  // function that is called when a mood button is clicked. It updates the mood state variable based on the selected mood level (as a percentage)
  const handleMoodChange = (newMood) => {
    // Calculate the width as a percentage
    const progressWidth = `${newMood}%`;
    setMood(progressWidth);
  };

  // function called when the save button is clicked. Saves the current mood and timestamp to Firebase Firestore and displays an alert message based on the mood level.
  const moodClick = async () => {
    const moodChange = parseInt(mood, 10); // convert mood (string) to an integer (base 10)

    try {
      const userDoc = doc(db, "users", loggedUser);

      // Save the mood and timestamp to Firebase Firestore
      await updateDoc(userDoc, {
        mood: moodChange,
        createdAt: serverTimestamp(),
      });
      console.log("Mood saved to Firebase:", moodChange);
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

    // Reset the mood to 0 after saving the mood
    setMood(0);
  };

  // function that resets the mood to 0 after the refresh icon button is clicked
  const handleExit = async () => {
    setMood(0);
  };

  //function that fetches user data based on the loggedUser identifier and updates the user's data (userData) state variable.
  useEffect(() => {
    //getUser fetches the user data from firebase
    const getUser = async () => {
      try {
        const snap = await getDoc(doc(db, "users", loggedUser)); //getDOc to get a  specific document in the users collection, we get loggedUser from local storage and is used as the document's ID
        //if the document exists it returns a DocumentSnaphot object which means the user data has been found in firestore
        if (snap.exists()) {
          let data = snap.data(); //extracts user data
          setUserData(data); //update userData with extracted/fetched user data
          console.log(userData);
        } else {
          console.log("No such document"); //if documenent doesn't exist in firestore
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser(); // calling getUSer to initiate thw data fetching when the component is mounted
  }, [conditionUser]); //this useeffect runs everytime the conditioUser array changes

  //if conditionUser is true while data is being fetched Loading.. is displayed
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
