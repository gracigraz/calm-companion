import React, { useState } from "react";
import { db } from "../../firebase-config";
import updateDoc from "firebase/firestore";
import "./Question.scss";

function Question({ question, userId }) {
  const [response, setResponse] = useState("");

  const handleResponse = async () => {
    if (response === "") return;

    const userResponsesRef = db.collection("user").doc(userId);
    await userResponsesRef.updateDoc({
      [question]: response,
    });

    setResponse("");
  };

  return (
    <div className="question">
      <div className="question__header">
        <button className="question__back">Back</button>
        <button className="question__exit">Exit</button>
      </div>

      <div className="question__content">{question}</div>
      <input
        className="question__answer"
        type="text"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />
      <button className="question__save" onClick={handleResponse}>
        Save/Next
      </button>
    </div>
  );
}

export default Question;
