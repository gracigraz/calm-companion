import "./Mood.scss";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp, //function from firebase that creates a timestamp
} from "firebase/firestore";

function Mood() {
  const [mood, setMood] = useState(0);
  const moodsCollectionRef = collection(db, "moods");
  const usersCollectionRef = collection(db, "users");
  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  const handleSaveMood = async () => {
    try {
      // Save the mood to Firebase Firestore

      await addDoc(usersCollectionRef, {
        mood: mood,
        createdAt: serverTimestamp(),
        // uid: user.uid,
      });
      //   await addDoc(moodsCollectionRef, {
      //     mood: mood,
      //     createdAt: serverTimestamp(),
      //     // uid: user.uid,
      //   });

      console.log("Mood saved to Firebase:", mood);

      // Reset the mood to 0 after saving
      setMood(0);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  return (
    <div className="mood">
      <h3 className="mood__exit">X</h3>
      <h4 className="mood__title">
        Hey, just so you know – every time you make an entry in your log, you're
        moving a bit closer to feeling awesome again. Keep it up! You got this!
        😉
      </h4>
      <div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${mood}%` }}></div>
        </div>

        <div className="mood__buttons">
          <button onClick={() => handleMoodChange(20)}>Awful</button>
          <button onClick={() => handleMoodChange(40)}>Bad</button>
          <button onClick={() => handleMoodChange(60)}>Fine</button>
          <button onClick={() => handleMoodChange(80)}>Good</button>
          <button onClick={() => handleMoodChange(100)}>Amazing</button>
        </div>

        <button onClick={handleSaveMood}>Save Mood</button>
      </div>
    </div>
  );
}
export default Mood;
