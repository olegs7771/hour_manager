import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import image from "../../../img/work_from_home.jpg";

class Landing extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${image})`,
          height: 700,
          width: "100%"
        }}
      >
        <div className="display-4 text-white pt-5 pl-5">HourManger</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
