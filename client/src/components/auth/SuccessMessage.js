import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmUser } from "../../store/actions/authAction";
import { withRouter } from "react-router-dom";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";
import { UpCase } from "../../utils/UpperCase";

export class SuccessMessage extends Component {
  state = {
    loading: false,
    errors: {},
    confirmed_user: null,
  };

  //After User sends a URL link with id and token
  componentDidMount() {
    const id = this.props.match.params.id;
    const token = this.props.match.params.token;

    this.props.confirmUser({ id, token });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading });
    }
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors,
        loading: false,
        confirmed_user: true,
      });
    }
    if (prevProps.confirmed_user !== this.props.confirmed_user) {
      this.setState({
        confirmed_user: this.props.confirmed_user,
        loading: false,
      });
    }
  }

  render() {
    if (this.state.loading || this.state.confirmed_user === null) {
      return (
        <div className="my-5" style={{ height: "100vh" }}>
          <DotLoaderSpinner />
        </div>
      );
    } else if (this.state.errors.error) {
      return (
        <div className="py-5" style={{ height: "100vh" }}>
          <div
            className="text-center mx-auto py-3 rounded"
            style={{ backgroundColor: "#FFF", width: "50%" }}
          >
            <span className="text-danger font-weight-bold">
              {this.state.errors.error}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="py-3 mx-auto "
          style={{
            height: "100vh",
            width: window.innerWidth > 500 ? "50%" : "100%",
          }}
        >
          <div className="text-center my-3 display-4 text-white">Success!</div>
          <div className="my-3 border rounded p-4">
            <span className="text-white">Dear</span>{" "}
            <span className="ml-1 font-italic text-white">
              {UpCase(this.state.confirmed_user.name)}
            </span>{" "}
            <span className="text-center text-white">
              Thank you for registration.
            </span>
            <br />
            <p className="text-white">
              We've now sent your request to the Hourmanager admin. Once the
              admin approves your request, you will be notified by email and be
              able the to access HourManager. Please save your credentials for
              further Login
            </p>
            <div className="my-3  rounded text-white">
              <span>Email : {this.state.confirmed_user.email}</span>
              <br />
              <span>Password: {this.state.confirmed_user.password}</span>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  loading: state.auth.loading,
  confirmed_user: state.auth.confirmed_user,
});

const mapDispatchToProps = { confirmUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SuccessMessage));
