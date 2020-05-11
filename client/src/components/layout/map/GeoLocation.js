import React from "react";

import MapContainer from "./MapContainer";
import { geolocated } from "react-geolocated";

class GeoLocation extends React.Component {
  state = {
    coords: {},
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.coords) {
        this.setState({
          coords: {
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude,
          },
        });
      }
    }
  }

  render() {
    if (!this.state.coords) {
      return <div>Loading</div>;
    } else {
      return <MapContainer coords={this.state.coords} />;
    }
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocation);
