///
import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const GOOGLE_MAP_API_KEY = "AIzaSyASLLZYTv8JDeXhU4ASMK4U_lyn4gD7vY0";

class MapContainer extends Component {
  state = {
    selectedPlace: {
      name: "some place",
    },
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={style}
        initialCenter={this.props.coords}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY,
})(MapContainer);

const style = {
  width: "100%",
  height: "100%",
};
