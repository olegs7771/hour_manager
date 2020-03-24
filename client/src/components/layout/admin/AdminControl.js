//This component receives URL with params from Admin Email Account
//Admin Can decide wether to approve or deny access to App
import React, { Component } from "react";
import { connect } from "react-redux";
import { approveReg } from "../../../store/actions/adminAction";
import { withRouter } from "react-router-dom";

class AdminPermit extends Component {
  componentDidMount() {
    const token = this.props.match.params.token;
    const access = this.props.match.params.access;

    this.props.approveReg({ token, access });
  }

  render() {
    return <div className="my-3">Admin Permits</div>;
  }
}

const mapPropsToState = { approveReg };

export default connect(null, mapPropsToState)(withRouter(AdminPermit));
