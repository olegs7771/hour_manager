import React, { Component } from "react";
import { connect } from "react-redux";

export class EmployeeDetails extends Component {
  render() {
    return <div>Employee Details</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
