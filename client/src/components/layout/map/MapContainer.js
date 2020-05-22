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
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDF9BWn17CT9geI3L-Ff0ujGWwpPHmxvCQ");

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
      //Coords for circle. if project doesnt has coords then show marker currrent
      // coords.
      circleCoords: {},
      address: "", //from GeoCode
      //Local State
      loading: false,
      //Redux
      messages: {},
    };
  }
  componentDidMount() {
    //Obtain Initial Coords from HTML5
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.setState((prevState) => ({
        ...prevState,

        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        projectID: this.props.location.state.data.projectId,
      }));
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.coords !== this.state.coords) {
      //Geocode new position
      Geocode.fromLatLng(this.state.coords.lat, this.state.coords.lng)
        .then((address) => {
          console.log("address", address);
          this.setState((prevState) => ({
            address: address.results[0].formatted_address,
          }));
        })
        .catch((err) => {
          console.log("error to get address", err);
        });
    }
    if (this.props.messages !== prevProps.messages) {
      if (this.props.messages) {
        this.setState({ messages: this.props.messages, loading: false });
      }
    }
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

  _submitCoords = () => {
    const payload = {
      projectID: this.state.projectID,
      coords: this.state.choosenPlace,
      address: this.state.address,
    };
    this.props.addCoords(payload);
    this.setState({ loading: true });
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
              {this.state.loading && (
                <div className="my-5 text-center">
                  <DotLoaderSpinner size={50} color="#FFF" />
                </div>
              )}
              {this.state.messages.message && (
                <div className="my-5 text-center">
                  <span className="text-white font-weight-bold ">
                    {this.state.messages.message}
                  </span>
                </div>
              )}
              {this.state.choosenPlace && !this.state.messages.message && (
                <div className="my-3  text-center">
                  <span className="text-center text-white h6 d-block">
                    Choosen Location
                  </span>
                  {/* Coords To Show */}
                  <div className="text-center border p-4">
                    <span className="text-white font-weight-bold">Address</span>
                    <br />
                    <span style={{ color: "#dede04" }}>
                      {this.state.address}
                    </span>
                    <br />
                    <br />
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
                // onClick={this._selectPlace(this.state.coords)}
                // name={this.state.coords}
              />
            </Map>
          </div>
        </div>
      </div>
    ) : (
      <div style={{ minHeight: 700 }}>Loading!!!..</div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.projects.selectedProject,
  messages: state.messages.messages,
});

export default connect(mapStateToProps, { addCoords })(
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
