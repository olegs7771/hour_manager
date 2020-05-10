import React, { useEffect, useRef, useState } from "react";
import GeoLocation from "./GeoLocation";
import { connect } from "react-redux";

// Variables
const GOOGLE_MAP_API_KEY = "AIzaSyASLLZYTv8JDeXhU4ASMK4U_lyn4gD7vY0";

// styles
const mapStyles = {
  width: "100%",
  height: "400px",
};

function Map(props) {
  const [coords, setCoords] = useState(null);
  // refs
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);

  // helper functions
  const createGoogleMap = (data) =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 5,
      center: {
        lat: data.lat,
        lng: data.lng,
      },
    });

  const createMarker = (data) =>
    new window.google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
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
      if (props.coords) {
        googleMap.current = createGoogleMap(props.coords);
        marker.current = createMarker(props.coords);
      }
    });
    googleMapScript.addEventListener("center_changed", () => {
      window.setTimeout(() => {
        console.log("reposition");
      }, 3000);
    });
  });

  return (
    <div>
      <GeoLocation />
      <div id="google-map" ref={googleMapRef} style={mapStyles} />;
    </div>
  );
}
const mapStateToProps = (state) => ({
  coords: state.projects.coords,
});

export default connect(mapStateToProps)(Map);
