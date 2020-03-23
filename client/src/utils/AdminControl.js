//This component receives URL with params from Admin Email Account
//Admin Can decide wether to approve or deny access to App
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AdminPermit extends Component {
  render() {
    return <div className="my-3">Admin Permits</div>;
  }
}

export default connect()(withRouter(AdminPermit));
