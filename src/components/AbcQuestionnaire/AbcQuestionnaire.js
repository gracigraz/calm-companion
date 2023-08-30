import "./AbcQuestionnaire.scss";

import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";

function AbcQuestionnaire() {
  return (
    <>
      <div className="questionnaire">Test</div>
      <h4 className="questionnaire__question"></h4>
      <p className="questionnaire__answer"></p>
    </>
  );
}
export default AbcQuestionnaire;
