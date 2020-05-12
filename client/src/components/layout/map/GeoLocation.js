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
    if (prevState.coords !== this.state.coords) {
      this.setState({ coords: this.state.coords });
    }
  }
  componentDidMount() {
    console.log("geo cdm ");

    if (this.props.coords) {
      this.setState({
        coords: {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
        },
      });
    }
  }
  _setNewCoords = (data) => {
    this.setState({ coords: data });
  };

  render() {
    if (Object.keys(this.state.coords).length === 0) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="border pt-2">
          <div className="mx-auto">
            <span className="text-center h6 text-white d-block my-4">
              Pick Location On Map
            </span>
          </div>
          <div style={{ height: 800 }}>
            <MapContainer
              coords={this.state.coords}
              //if marker moved .take new cords from marker.
              setNewCoords={this._setNewCoords}
            />
            ;
          </div>
        </div>
      );
    }
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocation);
