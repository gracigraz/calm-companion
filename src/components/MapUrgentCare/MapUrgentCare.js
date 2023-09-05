import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MapUrgentCare.scss";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapUrgentCare() {
  const [locations, setLocations] = useState([]);
  const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const latitude = 25.793449;
  const longitude = -80.139198;

  useEffect(() => {
    axios
      .get(
        "https://api.mapbox.com/search/searchbox/v1/suggest?q=urgent+care&language=en&proximity=-80.139198,25.793449&types=poi&session_token=0f4f2121-34e4-45a1-88a3-4476a1704c44&access_token=" +
          ACCESS_TOKEN
      )
      .then((response) => {
        const fetchedLocations = response.data.suggestions;
        console.log(response);
        setLocations(fetchedLocations);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <div className="urgent-care">
      <h4 className="urgent-care__title">
        We got you - search for urgent care NOW!
      </h4>
      <div className="urgent-care__list">
        {locations.map((location, index) => (
          <div key={index} className="urgent-care__item">
            <h4 className="urgent-care__name"> {location.name}</h4>
            <p className="urgent-care__address">{location.full_address}</p>
          </div>
        ))}
      </div>
      <Link
        to={`https://www.google.com/maps?q=${latitude},${longitude}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="urgent-care__button">Open in Google Maps App</button>
      </Link>
    </div>
  );
}
export default MapUrgentCare;
