import { useEffect, useState } from "react";
import * as React from "react";
import Map, { Marker } from "react-map-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapER.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

function MapER() {
  const [locations, setLocations] = useState([]); //state variable, array that will hold info about emergency roomlocations fetched from the mapbox api
  const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; //retrieve access token from env variables

  //fetches data from the Mapbox API when the component first mounts
  useEffect(() => {
    //axios get call search/searchbox/v1/category/emergency_room endpoint
    axios
      .get(
        "https://api.mapbox.com/search/searchbox/v1/category/emergency_room?access_token=" +
          ACCESS_TOKEN +
          "&language=en&limit=7&proximity=-80.2034%2C25.8017"
      )
      .then((response) => {
        //extracting locations of emergency rooms  from the response
        const fetchedLocations = response.data.features;
        setLocations(fetchedLocations);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <>
      <div className="emergency">
        <Link to="/crisis">
          <FontAwesomeIcon
            className="fa-1x"
            icon={icon({ name: "chevron-left", style: "solid" })}
          />
        </Link>
        <h4 className="emergency__title">
          We got you - search for Emergency Rooms NOW!
        </h4>
        <Map
          className="emergency__map"
          mapboxAccessToken={ACCESS_TOKEN}
          initialViewState={{
            longitude: -80.2034,
            latitude: 25.8017,
            zoom: 9,
          }}
          style={{ position: "absolute", width: "87%", height: "50%" }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          {locations.map((location, index) => (
            <Marker
              // markers are positioned based on latitude and longitude coordinates
              key={index}
              longitude={location.geometry.coordinates[0]}
              latitude={location.geometry.coordinates[1]}
              anchor="bottom"
              color="FFFFFF"
              width="5%"
            />
          ))}
        </Map>
        <div className="emergency__list">
          {locations.map((location, index) => (
            <div key={index} className="emergency__item">
              <h4 className="emergency__name"> {location.properties.name}</h4>
              <p className="emergency__address">
                {location.properties.full_address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MapER;
