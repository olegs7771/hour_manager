import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

export class JobHoursMonth extends Component {
  render() {
    return <div className="border my-2">Job Hours For Last Month</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JobHoursMonth);
