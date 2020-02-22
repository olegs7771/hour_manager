import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is Home Unprotected</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
