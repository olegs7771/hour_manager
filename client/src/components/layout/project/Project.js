import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Project extends Component {
  render() {
    return <div>Projects Protected</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
