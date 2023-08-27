import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useEffect } from "react";

function MapER() {
  const containerStyle = {
    width: "300px",
    height: "400px",
  };

  const center = {
    lat: 25.8017,
    lng: -80.2034,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  let map;

  async function initMap() {
    const { Map } = await window.google.maps.importLibrary("maps");

    // initMap();
    //   const initMap = () => {
    //     let map = new window.google.maps.Map(document.getElementById("map"), {
    //       center: center,
    //       zoom: 14,
    //       options: options,
    //     });

    const placesService = new window.google.maps.places.PlacesService(map);

    const request = {
      location: new window.google.maps.LatLng(center.lat, center.lng),
      radius: 10000,
      type: ["hospital", "health"],
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((place) => {
          createMarker(place, map);
        });
      }
    });
  }
  function createMarker(place, map) {
    new window.google.maps.Marker({
      position: place.geometry.location,
      map: map,
    });
  }

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap(); // Call the map initialization if Google Maps API is loaded
    } else {
      // Listen for the Google Maps API to be fully loaded
      const script = document.createElement("script");
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        process.env.REACT_APP_GOOGLE_APIKEY +
        `&libraries=places`;
      script.onload = initMap; // Call initMap once the script is loaded
      document.head.appendChild(script);
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      <div>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_APIKEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            options={options}
          ></GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
export default MapER;

// function initMap() {
//   let mapOptions = {
//     center: new google.maps.LatLng("25.8017", "-80.2034"),
//   };
//   let map = new google.maps.Map(document.getElementById("map"), mapOptions);
// }
