import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Home extends Component {
  render() {
    return (
      <div className="border rounded p-4 my-4">
        <h2>Wellcome To HourManager! Protected Dashboard</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
