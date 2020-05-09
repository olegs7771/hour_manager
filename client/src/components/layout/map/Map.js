import React, { useEffect, useRef } from "react";

// Variables
const GOOGLE_MAP_API_KEY = "AIzaSyASLLZYTv8JDeXhU4ASMK4U_lyn4gD7vY0";

const myLocation = {
  // CN Tower Landmark
  lat: 43.642567,
  lng: -79.387054,
};
// styles
const mapStyles = {
  width: "100%",
  height: "400px",
};

function Map(props) {
  // refs
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);

  // helper functions
  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 5,
      center: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      },
    });

  const createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: myLocation.lat, lng: myLocation.lng },
      map: googleMap.current,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });

  // useEffect Hook
  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      googleMap.current = createGoogleMap();
      marker.current = createMarker();
    });
  });

  return <div id="google-map" ref={googleMapRef} style={mapStyles} />;
}

export default Map;
