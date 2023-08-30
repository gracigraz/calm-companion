import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./CrisisPage.scss";

function CrisisPage() {
  const handleCallEmergency = () => {
    window.location.href = "tel:911";
  };

  const handleCallHelpLine = () => {
    window.location.href = "tel:988";
  };

  const handleFindUrgentCare = () => {
    window.location.href = "/urgent-care";
  };

  const handleFindER = () => {
    window.location.href = "/emergency-room";
  };

  return (
    <>
      <main className="crisis">
        <h2 className="crisis__title">Help is available!</h2>
        <div className="crisis__container">
          <div className="crisis__buttons">
            <button className="crisis__911" onClick={handleCallEmergency}>
              Call 911
            </button>
            <button className="crisis__988" onClick={handleCallHelpLine}>
              Call 988
            </button>
          </div>
          <div className="crisis__buttons">
            <button
              className="crisis__urgent-care"
              onClick={handleFindUrgentCare}
            >
              Find Urgent Care Near You
            </button>
            <button className="crisis__ER" onClick={handleFindER}>
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
