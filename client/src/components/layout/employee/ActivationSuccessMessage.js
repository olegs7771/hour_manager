import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { activEmp } from "../../../store/actions/employeeAction";

export class ActivationSuccessMessage extends Component {
  state = {
    loading: false,
    errors: {},
    confirmed_user: null
  };

  componentDidMount() {
    // New Employee Received Email and after he clicked activate link
    //URI with params

    this.props.activEmp({ data: "test" });
  }

  render() {
    return (
      <div className="my-4 border rounded">
        <div className="text-center display-4">Success</div>
        <div className="my-4 border p-4">
          <p>
            Dear (Name) we are pleased to inform you that your HourManager
            account has been activated. Please download HourManager App, after
            installation on your cellphone follow further instructions
          </p>
          <p>HourManager Administration</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { activEmp };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivationSuccessMessage);
