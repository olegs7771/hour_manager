///
import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const GOOGLE_MAP_API_KEY = "AIzaSyASLLZYTv8JDeXhU4ASMK4U_lyn4gD7vY0";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.markerRef = React.createRef();

    this.state = {
      selectedPlace: {
        name: "some place",
      },
    };
  }

  _onMapClick = (e) => {
    console.log("e clicked", e);
  };
  _centerMoved = (mapProps, map) => {
    console.log("e moved", mapProps, map);
  };

  _positionChanged = (e) => {
    console.log(
      "e position",
      this.markerRef.current.marker.getPosition().toString()
    );
  };

  render() {
    console.log("props in render of map", this.props.coords);

    if (Object.keys(this.props.coords).length === 0) {
      return <div>Loading..</div>;
    }
    if (this.props.coords) {
      return (
        <Map
          google={this.props.google}
          zoom={10}
          style={style}
          initialCenter={this.props.coords}
          onClick={this._onMapClick}
          onDragend={this._centerMoved}
          gestureHandling="greedy"
        >
          <Marker
            ref={this.markerRef}
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={this.props.coords}
            draggable={true}
            position_changed={this._positionChanged}
          />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY,
})(MapContainer);

const style = {
  width: "100%",
  height: 500,
};
