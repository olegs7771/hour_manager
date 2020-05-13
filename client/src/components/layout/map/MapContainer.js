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
const coords = {
  lat: 32.86284450000001,
  lng: 35.0718397,
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.markerRef = React.createRef();
    this.mapRef = React.createRef();

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      coords: {},
    };
  }
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition((position) => {
      console.log("window.navigator", window.navigator);

      this.setState({
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
    //For Resize Window
    // window.addEventListener("resize", () => {
    //   this._changeWidth();
    // });
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
    this.setState({
      coords: this.state.newCoords,
      choosenLocation: this.state.newCoords,
    });
  };

  _selectedPlace = (data) => {
    console.log("data", data);
    // this.setState({ info: true });
  };

  render() {
    return Object.keys(this.state.coords).length > 0 ? (
      <div className="pt-3">
        <div className="text-center h6 text-white ">Pick Location</div>
        <div className="row py-4" style={{ height: "100vh" }}>
          <div className="col-md-4 border px-4">
            {" "}
            <div className="py-3 ">
              <span className="text-white">
                In order to choose the area where your employees be able to get
                access to the app geolocation features position the marker on
                the desirable location and submit.
              </span>
              {/* Choosen Location */}
              {this.state.choosenLocation && (
                <div className="my-3  text-center">
                  <span className="text-center text-white h6 d-block">
                    Choosen Location
                  </span>
                  {/* Coords To Show */}
                  <div className="text-center border p-4">
                    <span className="text-white font-weight-bold ">
                      Latitude
                    </span>{" "}
                    <span style={{ color: "#dede04" }}>
                      {this.state.choosenLocation.lat}
                    </span>
                    <br />
                    <span className="text-white font-weight-bold">
                      Longitude
                    </span>{" "}
                    <span style={{ color: "#dede04" }}>
                      {this.state.choosenLocation.lng}
                    </span>
                  </div>

                  <input
                    className="btn btn-primary my-3"
                    type="button"
                    value="Submit"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-md-8 border ">
            <Map
              ref={this.mapRef}
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
    ) : (
      <div>Loading..</div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY,
})(MapContainer);

const style = {
  width: window.innerWidth < 1000 ? "100%" : "80%",
  height: 500,
  position: "relative",
};
