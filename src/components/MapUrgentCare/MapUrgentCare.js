import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./MapUrgentCare.scss";

function MapUrgentCare() {
  const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [25.793449, -80.139198],
      zoom: 9,
    });

    const searchJS = document.createElement("script");
    searchJS.src = "https://api.mapbox.com/search-js/v1.0.0-beta.17/web.js";
    searchJS.onload = function () {
      const searchBox = new window.MapboxSearchBox();
      searchBox.accessToken = ACCESS_TOKEN;
      searchBox.options = {
        types: "address, poi, category, postcode",
        // poi_category: "emergency_room",
        proximity: [25.793449, -80.139198],
      };
      searchBox.marker = true;
      searchBox.mapboxgl = mapboxgl;
      map.addControl(searchBox);
    };

    document.body.appendChild(searchJS);

    return () => {
      map.remove();
      document.body.removeChild(searchJS);
    };
  }, []);

  return (
    <div>
      We got you - search for urgent care NOW!
      <div
        id="map"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default MapUrgentCare;
