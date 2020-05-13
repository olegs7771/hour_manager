import React from "react";

import MapContainer from "./MapContainer";
import { geolocated } from "react-geolocated";

class GeoLocation extends React.Component {
  state = {
    choosenLocation: null,
  };

  _setLocation = (data) => {
    this.setState({ choosenLocation: data });
  };

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className="border pt-2" style={{ height: "100vh" }}>
        <div className="mx-auto">
          <span className="text-center h6 text-white d-block my-4">
            Pick Location On Map
          </span>
        </div>
        <div className={window.innerWidth > 1000 ? "row px-5" : "row"}>
          <div className="col-md-4 ">
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
                    Chossen Location
                  </span>
                  <span className="text-white font-weight-bold">Latitude</span>{" "}
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
                  <input
                    className="btn btn-primary my-3"
                    type="button"
                    value="Submit"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-md-8 ">
            <MapContainer setLocation={this._setLocation} />
          </div>
        </div>
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocation);
