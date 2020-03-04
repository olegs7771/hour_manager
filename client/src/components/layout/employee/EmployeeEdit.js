import React, { Component } from "react";
import { connect } from "react-redux";

export class EmployeeEdit extends Component {
  render() {
    return <div>Edit here</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
