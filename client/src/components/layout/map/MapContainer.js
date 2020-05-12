///
import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const GOOGLE_MAP_API_KEY = "AIzaSyASLLZYTv8JDeXhU4ASMK4U_lyn4gD7vY0";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.markerRef = React.createRef();
    this.mapRef = React.createRef();

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  _centerMoved = (mapProps, map) => {
    console.log("e moved", mapProps, map);
  };

  _positionChanged = (e) => {
    const position = this.markerRef.current.marker.getPosition();
    const newCoordsObj = {
      lat: position.lat(),
      lng: position.lng(),
    };
    // console.log("newCoordsObj", newCoordsObj);
    // this.props.setNewCoords(newCoordsObj);
    this.setState((prevState) => {
      return {
        ...prevState,
        newCoords: newCoordsObj,
      };
    });
  };
  _markerDragged = () => {
    console.log("dragged");
    this.props.setNewCoords(this.state.newCoords);
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
          ref={this.mapRef}
        >
          <Marker
            ref={this.markerRef}
            onClick={this._onMarkerClick}
            // name={"Current location"}
            position={this.props.coords}
            draggable={true}
            position_changed={this._positionChanged}
            onDragend={this._markerDragged}
          />
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
