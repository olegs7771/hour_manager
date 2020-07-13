///
import React, { Component } from "react";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { connect } from "react-redux";
import { addCoords, pickLocation } from "../../../store/actions/projectAction";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Circle,
} from "google-maps-react";
import Geocode from "react-geocode";

const GEOCODE_API_KEY = process.env.REACT_APP_GEOCODE_API_KEY;
Geocode.setApiKey(GEOCODE_API_KEY);

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const LoadingContainer = (props) => (
  <div style={{ height: "100vh" }}>
    <div className="my-5 mx-auto">
      <DotLoaderSpinner />
    </div>
  </div>
);

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
      plus_code: "",
      //Local State
      loading: false,
      //Redux
      messages: {},
    };
  }
  componentDidMount() {
    //Coords from data in link
    this.setState({ circleCoords: this.props.location.state.data.coords });
    console.log(
      "coords for circle in cdm",
      this.props.location.state.data.coords
    );
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
          const str1 = this.setState({
            address: address.results[0].formatted_address,
            //subString from global_code  firsr 8 chars : "8G4QV37F+6W"
            plus_code: address.plus_code.global_code.substring(8, 0),
          });
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

  // _centerMoved = (mapProps, map) => {};

  _positionChanged = (e) => {
    const position = this.markerRef.current.marker.getPosition();
    const newCoordsObj = {
      lat: position.lat(),
      lng: position.lng(),
    };
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
    //if used in Create Project than no projectID yet exists
    if (this.state.projectID === undefined) {
      const payload = {
        coords: this.state.choosenPlace,
        address: this.state.address,
      };
      this.setState({ loading: true });
      this.props.pickLocation(payload);
      setTimeout(() => {
        this.props.history.push("/create_project");
      }, 3000);
    } else {
      //In editing the existing project
      const payload = {
        projectID: this.state.projectID,
        coords: this.state.choosenPlace,
        address: this.state.address,
      };
      this.props.addCoords(payload);
      this.setState({ loading: true });
    }
  };

  _cancelLocation = () => {
    this.setState({
      choosenPlace: null,
    });
  };
  componentWillUnmount() {
    this.setState({ loading: false });
  }

  render() {
    return Object.keys(this.state.coords).length > 0 ? (
      <div
        className={
          window.innerWidth < 1000
            ? "pt-3 tex-center pr-4"
            : "pt-3 tex-center  "
        }
        style={{ minHeight: "100vh" }}
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
                position={this.state.coords}
                draggable={true}
                position_changed={this._positionChanged}
                onDragend={this._markerDragged}
                // onClick={this._selectPlace(this.state.coords)}
                // name={this.state.coords}
              />

              <Circle
                center={this.state.circleCoords}
                radius={500}
                strokeOpacity={0}
                strokeWeight={5}
                fillColor="#FF0000"
                fillOpacity={0.2}
              />
            </Map>
          </div>
        </div>
      </div>
    ) : (
      <div style={{ minHeight: "100vh" }}>Loading!!!..</div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.projects.selectedProject,
  messages: state.messages.messages,
});

export default connect(mapStateToProps, { addCoords, pickLocation })(
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
