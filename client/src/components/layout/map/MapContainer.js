///
import React, { Component } from "react";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Circle,
} from "google-maps-react";
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

  _markerDragged = () => {
    this.setState({
      coords: this.state.newCoords,
    });
    this.props.setLocation(this.state.newCoords);
  };

  _selectedPlace = (data) => {
    console.log("data", data);
    // this.setState({ info: true });
  };

  render() {
    if (Object.keys(this.state.coords).length === 0) {
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

    return (
      <div>
        <div className="text-center h6">Pick Location</div>
        <div className="row py-4" style={{ height: "100vh" }}>
          <div className="col-md-4">pick location</div>
          <div className="col-md-8 ">
            <Map
              google={this.props.google}
              zoom={10}
              style={style}
              initialCenter={this.state.coords}
              center={this.state.coords}
              onDragend={this._centerMoved}
              gestureHandling="cooperative"
            >
              <Marker
                ref={this.markerRef}
                name={"Current location"}
                position={this.state.coords}
                draggable={true}
                position_changed={this._positionChanged}
                onDragend={this._markerDragged}
                onClick={this._selectedPlace(this.state.coords)}
                // name={this.state.coords}
              />
              <InfoWindow visible={this.state.info}>
                <span>{this.state.selectedPlace.name}</span>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY,
})(MapContainer);

const style = {
  width: "100%",
  height: 500,
  position: "relative",
};
