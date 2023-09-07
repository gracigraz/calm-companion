import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./CrisisPage.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function CrisisPage() {
  //using useState hook to create state variables for tracking whether each button has been clicked. Initialized to false.
  const [isButtonClicked988, setIsButtonClicked988] = useState(false);
  const [isButtonClicked911, setIsButtonClicked911] = useState(false);
  const [isButtonClickedUC, setIsButtonClickedUC] = useState(false);
  const [isButtonClickedER, setIsButtonClickedER] = useState(false);

  //function called when call 911 button is clicked, initiates a call to 911.
  const handleCallEmergency = () => {
    setIsButtonClicked911(true);
    window.location.href = "tel:911";
  };

  //function called when call 988 button is clicked, initiates a call to 988 crisis phone number.
  const handleCallHelpLine = () => {
    setIsButtonClicked988(true);
    window.location.href = "tel:988";
  };
  //function called when "Find Urgent Care Near You" button is clicked, navigates the user to a page with information on finding urgent care facilities.
  const handleFindUrgentCare = () => {
    setIsButtonClickedUC(true);
    window.location.href = "/urgent-care";
  };

  //function called when "Find Emergency Room Near You" button is clicked, navigates the user to a page with information on finding emergency rooms.
  const handleFindER = () => {
    setIsButtonClickedER(true);
    window.location.href = "/emergency-room";
  };

  return (
    <>
      <main className="crisis">
        <h1 className="crisis__title">Help is available!</h1>
        <div className="crisis__container">
          <button
            className={`crisis__911 ${isButtonClicked911 ? "clicked" : ""}`}
            onClick={handleCallEmergency}
          >
            <FontAwesomeIcon
              className="fa-2x crisis__icon"
              icon={icon({ name: "user-doctor", style: "solid" })}
            />
            Call 911
          </button>
          <button
            className={`crisis__988 ${isButtonClicked988 ? "clicked" : ""}`}
            onClick={handleCallHelpLine}
          >
            <FontAwesomeIcon
              className="fa-2x crisis__icon"
              icon={icon({ name: "user-nurse", style: "solid" })}
            />
            Call 988
          </button>
          <button
            className={`crisis__urgent-care ${
              isButtonClickedUC ? "clicked" : ""
            }`}
            onClick={handleFindUrgentCare}
          >
            <FontAwesomeIcon
              className="fa-2x crisis__icon"
              icon={icon({ name: "house-medical", style: "solid" })}
            />
            Find Urgent Care Near You
          </button>
          <button
            className={`crisis__ER ${isButtonClickedER ? "clicked" : ""}`}
            onClick={handleFindER}
          >
            <FontAwesomeIcon
              className="fa-2x crisis__icon"
              icon={icon({ name: "location-dot", style: "solid" })}
            />
            Find Emergency Room Near You
          </button>
        </div>
      </main>
      <Nav />
    </>
  );
}

export default CrisisPage;
