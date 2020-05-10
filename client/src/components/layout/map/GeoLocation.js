import React from "react";
import { connect } from "react-redux";
import { getGeoCoords } from "../../../store/actions/projectAction";
import { geolocated } from "react-geolocated";
class GeoLocation extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.isGeolocationAvailable) {
        let data = {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
        };
        this.props.getGeoCoords(data);
      }
    }
  }

  render() {
    return null;
  }
}
export default connect(null, { getGeoCoords })(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(GeoLocation)
);
