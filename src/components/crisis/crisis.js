import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Crisis.scss";

function MapboxLocations() {
  const [locatiuns, setLocations] = useState([]);
  const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_DEFAULT_ACCESS_TOKEN;

  useEffect(() => {
    axios
      .get(
        "https://api.mapbox.com/search/searchbox/v1/suggest?q=urgent+care&language=en&proximity=-80.139198,25.793449&types=poi&session_token=0f4f2121-34e4-45a1-88a3-4476a1704c44&access_token=" +
          ACCESS_TOKEN
      )
      .then((response) => {
        // const fetchedLocations = response.data.features;
        const fetchedLocations = response.data.suggestions;
        console.log(response);
        setLocations(fetchedLocations);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <div className="mapbox-locations">
      <h4>Urgent Care Locations</h4>
      <div className="locations-list">
        {locatiuns.map((locatiun, index) => (
          <div key={index} className="location-item">
            <h4> {locatiun.name}</h4>
            <p>{locatiun.full_address}</p>
          </div>
          // {locations.map((location, index) => (
          //   <div key={index} className="location-item">
          //     <h4> {location.properties.name}</h4>
          //     <p>{location.properties.full_address}</p>
          //     <p>Latitude: {location.geometry.coordinates[1]}</p>
          //     <p>Longitude: {location.geometry.coordinates[0]}</p>
          //   </div>
        ))}
      </div>
    </div>
  );
}

function Crisis() {
  const [showMapboxLocations, setShowMapboxLocations] = useState(false);

  const handleCallEmergency = () => {
    window.location.href = "tel:911";
  };

  const handleCallHelpLine = () => {
    window.location.href = "tel:988";
  };

  const handleFindUrgentCare = () => {
    setShowMapboxLocations(true);
  };

  const handleFindER = () => {
    window.location.href = "/emergency-room";
  };

  return (
    <>
      <div className="crisis">
        <h2 className="crisis__title">Help is available!</h2>
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
      {showMapboxLocations && <MapboxLocations />}
    </>
  );
}

export default Crisis;
