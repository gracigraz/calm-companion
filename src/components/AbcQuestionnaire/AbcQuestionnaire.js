import "./AbcQuestionnaire.scss";
import React, { useEffect, useState } from "react";
import { doc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

function AbcQuestionnaire() {
  const [questions, setQuestions] = useState([]);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    async function fetchQuestions() {
      const questionsSnapshot = await db.collection("abc-questions").get();
      const questionList = questionsSnapshot.docs.map((doc) => doc.data().text);
      setQuestions(questionList);
    }
    fetchQuestions();
  }, []);

  return (
    <>
      <div className="questionnaire">
        {questions.map((question, index) => (
          <Question key={index} question={question} userId={userId} />
          //   <h4 className="questionnaire__question"></h4>
          //   <p className="questionnaire__answer"></p>
        ))}
      </div>
    </>
  );
}
export default AbcQuestionnaire;
