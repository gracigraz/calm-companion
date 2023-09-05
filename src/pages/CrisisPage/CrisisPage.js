import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./CrisisPage.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

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
              <FontAwesomeIcon
                className="fa-2x"
                icon={icon({ name: "user-doctor", style: "solid" })}
              />
              Call 911
            </button>
            <button
              className={`crisis__988 ${isButtonClicked988 ? "clicked" : ""}`}
              onClick={handleCallHelpLine}
            >
              <FontAwesomeIcon
                className="fa-2x"
                icon={icon({ name: "user-nurse", style: "solid" })}
              />
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
              <FontAwesomeIcon
                className="fa-2x"
                icon={icon({ name: "house-medical", style: "solid" })}
              />
              Find Urgent Care Near You
            </button>
            <button
              className={`crisis__ER ${isButtonClickedER ? "clicked" : ""}`}
              onClick={handleFindER}
            >
              <FontAwesomeIcon
                className="fa-2x"
                icon={icon({ name: "location-dot", style: "solid" })}
              />
              Find Emergency Room Near You
            </button>
            {/* <FontAwesomeIcon icon="fa-solid fa-hand-holding-medical" /> */}
          </div>
        </div>
      </main>
      <Nav />
    </>
  );
}

export default CrisisPage;
