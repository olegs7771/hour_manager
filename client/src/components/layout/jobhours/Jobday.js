import React, { Component } from "react";
import { connect } from "react-redux";

export class Jobday extends Component {
  render() {
    return <div>Job day here</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Jobday);
