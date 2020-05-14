///
import React, { Component } from "react";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { connect } from "react-redux";
import { addCoords } from "../../../store/actions/projectAction";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Circle,
} from "google-maps-react";
const GOOGLE_MAP_API_KEY = "AIzaSyASLLZYTv8JDeXhU4ASMK4U_lyn4gD7vY0";

const LoadingContainer = (props) => <div>Fancy loading container!</div>;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.markerRef = React.createRef();
    this.mapRef = React.createRef();

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      //for info window
      selectedPlace: {},
      //for show choosen place befor submit to db
      choosenPlace: null,
      coords: {},
      projectID: null,
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
        //Get ProjectID from props
        projectID: this.props.location.state.projectId,
      });
    });
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
      choosenPlace: this.state.newCoords,
    });
  };

  _selectPlace = (data) => {
    console.log("data", data);
    // this.setState({ info: true });
  };

  _submitCoords = () => {
    const payload = {
      projectID: this.state.projectID,
      coords: this.state.choosenPlace,
    };
    this.props.addCoords(payload);
  };

  _cancelLocation = () => {
    this.setState({
      choosenPlace: null,
    });
  };

  render() {
    return Object.keys(this.state.coords).length > 0 ? (
      <div
        className={
          window.innerWidth < 1000
            ? "pt-3 tex-center pr-4"
            : "pt-3 tex-center  "
        }
        style={{ minHeight: 700 }}
      >
        <div className="text-center h6 text-white ">Pick Location</div>
        <div className="row py-4">
          <div className="col-md-5  px-4">
            {" "}
            <div className={window.innerWidth < 1000 ? "pl-2" : "py-3 pl-2"}>
              <span className="text-white">
                In order to choose the area where your employees be able to get
                access to the app geolocation features position the marker on
                the desirable location and submit.
              </span>
              {/* Choosen Location */}
              {this.state.choosenPlace && (
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
                      {this.state.choosenPlace.lat}
                    </span>
                    <br />
                    <span className="text-white font-weight-bold">
                      Longitude
                    </span>{" "}
                    <span style={{ color: "#dede04" }}>
                      {this.state.choosenPlace.lng}
                    </span>
                  </div>
                  <div className="btn-group my-3">
                    <input
                      className="btn btn-primary "
                      type="button"
                      value="Submit"
                      onClick={this._submitCoords}
                    />
                    <input
                      className="btn btn-primary ml-1 "
                      type="button"
                      value="Cancel"
                      onClick={this._cancelLocation}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={"col-md-7  "}>
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
                onClick={this._selectPlace(this.state.coords)}
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
      <div style={{ minHeight: 700 }}>Loading..</div>
    );
  }
}

export default connect(null, { addCoords })(
  GoogleApiWrapper({
    apiKey: GOOGLE_MAP_API_KEY,
    LoadingContainer,
  })(MapContainer)
);

const style = {
  width: window.innerWidth < 1000 ? "100%" : "90%",
  height: window.innerWidth < 1000 ? 300 : 500,
  marginTop: window.innerWidth < 1000 ? 20 : 0,
};
