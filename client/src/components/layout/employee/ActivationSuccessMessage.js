import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { activEmp } from "../../../store/actions/employeeAction";

export class ActivationSuccessMessage extends Component {
  state = {
    loading: false,
    errors: {},
    activatedEmployee: null,
    messages: {}
  };

  componentDidMount() {
    // New Employee Received Email and after he clicked activate link
    //URI with params
    const uid = this.props.match.params.id;
    const projectID = this.props.match.params.projectID;
    const email = this.props.match.params.email;

    this.props.activEmp({ uid, projectID, email });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messages !== this.props.messages) {
      this.setState({ messages: this.props.messages, confirmed_user: true });
    }
    if (prevProps.activatedEmployee !== this.props.activatedEmployee) {
      this.setState({ activatedEmployee: this.props.activatedEmployee });
    }
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading });
    }
  }

  render() {
    if (this.state.loading || this.state.activatedEmployee === null) {
      return (
        <div className="my-5">
          <DotLoaderSpinner />
        </div>
      );
    } else if (this.state.messages.message) {
      return (
        <div className="my-4 border p-4">{this.state.messages.message}</div>
      );
    } else {
      return (
        <div className="my-4 border rounded">
          <div className="text-center display-4">Success</div>
          <div className="my-4 border p-4">
            <p>
              Dear {this.state.activatedEmployee.employeeName} we are pleased to
              inform you that your HourManager account has been activated.
              Please download HourManager App, after installation on your
              cellphone follow further instructions
            </p>
            <p>HourManager Administration</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  activatedEmployee: state.employees.activatedEmployee,
  messages: state.messages.messages
});

const mapDispatchToProps = { activEmp };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ActivationSuccessMessage));
