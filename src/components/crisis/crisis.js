// import React from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// const CallEmergency = () => {
//   const handleCallEmergency = () => {
//     window.location.href = "tel:911";
//   };
//   const CallHelpLine = () => {
//     const handleCallHelpLine = () => {
//       window.location.href = "tel:988";
//     };

//   function initMap() {
//     // Initialize map
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE },
//       zoom: 14,
//     });

//     // Create a PlacesService object to interact with Places API
//     const placesService = new google.maps.places.PlacesService(map);

//     // Define a request to search for coffee shops nearby
//     const request = {
//       location: new google.maps.LatLng(YOUR_LATITUDE, YOUR_LONGITUDE),
//       radius: 1000, // Search radius in meters
//       types: ["cafe"], // Filter results to cafes
//     };

//     // Perform the nearby search
//     placesService.nearbySearch(request, (results, status) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (let i = 0; i < results.length; i++) {
//           createMarker(results[i]);
//         }
//       }
//     });
//   }

//   function createMarker(place) {
//     const marker = new google.maps.Marker({
//       position: place.geometry.location,
//       map: map,
//     });
//   }

//   return (
//     <>
//       <button onClick={handleCallEmergency}>
//         Call 911 in Case of Emergency
//       </button>
//       <button onClick={handleCallEmergency}>
//         Call 988 Help is Available
//       </button>
//       <h2>Connect with people you trust</h2>
//       <div id="map"></div>;
//     </>
//   );
// };

// export default Call911Emergency;
