import { useEffect, useState } from "react";
import * as React from "react";
import Map, { Marker } from "react-map-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

function MapER() {
  const [locations, setLocations] = useState([]);
  const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    axios
      .get(
        "https://api.mapbox.com/search/searchbox/v1/category/emergency_room?access_token=" +
          ACCESS_TOKEN +
          "&language=en&limit=7&proximity=-80.188109%2C25.807706"
      )
      .then((response) => {
        const fetchedLocations = response.data.features;
        console.log(response);
        setLocations(fetchedLocations);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <>
      <div className="emergency">
        <h4 className="emergency__title">
          We got you - search for Emergency Rooms NOW!
        </h4>
        <Map
          className="emergency__map"
          mapboxAccessToken={ACCESS_TOKEN}
          initialViewState={{
            longitude: -81,
            latitude: 25,
            zoom: 9,
          }}
          style={{ position: "absolute", width: "100%", height: "50%" }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          {locations.map((location, index) => (
            <Marker
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
              <h4 className="emergency__name"> {location.properties.name}</h4>:
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
