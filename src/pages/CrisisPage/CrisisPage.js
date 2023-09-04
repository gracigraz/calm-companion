import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./CrisisPage.scss";

function CrisisPage() {
  const [isButtonClicked988, setIsButtonClicked988] = useState(false);
  const [isButtonClicked911, setIsButtonClicked911] = useState(false);
  const [isButtonClickedUC, setIsButtonClickedUC] = useState(false);
  const [isButtonClickedER, setIsButtonClickedER] = useState(false);

  const handleCallEmergency = () => {
    setIsButtonClicked911(true);
    window.location.href = "tel:911";
  };

  const handleCallHelpLine = () => {
    setIsButtonClicked988(true);
    window.location.href = "tel:988";
  };

  const handleFindUrgentCare = () => {
    setIsButtonClickedUC(true);
    window.location.href = "/urgent-care";
  };

  const handleFindER = () => {
    setIsButtonClickedER(true);
    window.location.href = "/emergency-room";
  };

  return (
    <>
      <main className="crisis">
        <h2 className="crisis__title">Help is available!</h2>
        <div className="crisis__container">
          <div className="crisis__buttons">
            <button
              className={`crisis__911 ${isButtonClicked911 ? "clicked" : ""}`}
              onClick={handleCallEmergency}
            >
              Call 911
            </button>
            <button
              className={`crisis__988 ${isButtonClicked988 ? "clicked" : ""}`}
              onClick={handleCallHelpLine}
            >
              Call 988
            </button>
          </div>
          <div className="crisis__buttons">
            <button
              className={`crisis__urgent-care ${
                isButtonClickedUC ? "clicked" : ""
              }`}
              onClick={handleFindUrgentCare}
            >
              Find Urgent Care Near You
            </button>
            <button
              className={`crisis__ER ${isButtonClickedER ? "clicked" : ""}`}
              onClick={handleFindER}
            >
              Find Emergency Room Near You
            </button>
          </div>
        </div>
      </main>
      <Nav />
    </>
  );
}

export default CrisisPage;
