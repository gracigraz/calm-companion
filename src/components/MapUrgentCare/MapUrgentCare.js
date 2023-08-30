import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "./MapUrgentCare.scss";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapUrgentCare() {
  const [locations, setLocations] = useState([]);
  // const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_DEFAULT_ACCESS_TOKEN;
  const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // mapboxgl.accessToken = ACCESS_TOKEN;

  // const map = new mapboxgl.Map({
  //   container: "map",
  //   style: "mapbox://styles/mapbox/dark-v11",
  //   center: [25.793449, -80.139198], //miami beach locations
  //   zoom: 9,
  // });
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
      <h4 className="map__title">We got you - search for urgent care NOW!</h4>
      <div className="locations-list">
        {locations.map((location, index) => (
          <div key={index} className="location-item">
            <h4> {location.name}</h4>
            <p>{location.full_address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MapUrgentCare;
