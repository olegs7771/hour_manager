import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Popup from "../popup/Popup";

export class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is Home Unprotected</h2>
        <Popup />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
