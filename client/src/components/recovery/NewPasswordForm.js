import React, { Component } from "react";
import TextFormGroup from "../textForms/TextFormGroup";
import { connect } from "react-redux";
import { newPassword } from "../../store/actions/authAction";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";

class NewPasswordForm extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    errors: {},
    loading: false,
    isPasswordsMatch: false, // for prevent redirect to login without typing in passwords, due to message props changed
  };

  _onChange = (e) => {
    console.log("e.target.name", e.target.name);
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });

    //Alert if user writes wrong format password
    if (this.state.newPassword.length >= 10) {
      this.setState({ errors: { newPassword: "Max 10 chars" } });
    }

    if (this.state.newPassword.length < 6) {
      this.setState({ errors: { newPassword: "Min 6 chars" } });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    //Validate newPassword
    if (this.state.newPassword !== prevState.newPassword) {
      if (
        this.state.newPassword.length <= 10 &&
        this.state.newPassword.length >= 6 &&
        this.state.newPassword.length !== 0
      ) {
        this.setState({ errors: {} });
      }
    }
    //Validation confirmPassword
    if (this.state.confirmPassword !== prevState.confirmPassword) {
      if (this.state.confirmPassword !== this.state.newPassword) {
        this.setState({ errors: { confirmPassword: "No Match" } });
      }
      if (this.state.confirmPassword === this.state.newPassword) {
        this.setState({ isPasswordsMatch: true });
      }
      if (
        this.state.confirmPassword.length <= 10 &&
        this.state.confirmPassword.length >= 6 &&
        this.state.confirmPassword.length !== 0
      ) {
        this.setState({ errors: {} });
      }
    }
    //Redirect After
    if (
      this.props.messages !== prevProps.messages &&
      this.state.isPasswordsMatch
    ) {
      setTimeout(() => {
        this.props.history.push("/login");
      }, 3000);
    }
  }

  _onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    //Validation

    if (this.state.newPassword.length === 0) {
      return this.setState({
        errors: { newPassword: "Please choose password between 6-10 chars" },
      });
    }
    if (this.state.confirmPassword.length === 0) {
      return this.setState({
        errors: {
          confirmPassword: "Please choose password between 6-10 chars",
        },
      });
    }

    if (this.state.confirmPassword !== this.state.newPassword) {
      return this.setState({ errors: { confirmPassword: "No match" } });
    }

    const payload = {
      password: this.state.confirmPassword,
      uid: this.props.uid,
    };
    this.props.newPassword(payload);
  };

  render() {
    if (this.props.loading) {
      return (
        <div className="mx-auto" style={{ paddingTop: "20%" }}>
          <DotLoaderSpinner />
        </div>
      );
    }
    if (this.props.messages.message) {
      return (
        <div className="text-center my-4">
          <span className="text-success h5 ">
            {this.props.messages.message}
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <div className="my-3 text-center">
            <span className="text-white h5">Create New Password</span>
            <form
              onSubmit={this._onSubmit}
              className="border mx-auto p-4 my-4"
              style={{ width: "50%" }}
            >
              <TextFormGroup
                label="New Password"
                name="newPassword"
                style={{ color: "#fff" }}
                onChange={this._onChange}
                error={this.state.errors.newPassword}
              />

              <TextFormGroup
                label="Confirm Password"
                name="confirmPassword"
                style={{ color: "#fff" }}
                onChange={this._onChange}
                error={this.state.errors.confirmPassword}
              />

              <div className="mx-auto my-3">
                <button type="submit" className="btn btn-outline-secondary  ">
                  <span className="text-white">Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  // errors: state.errors.errors,
  messages: state.messages.messages,
  // user: state.auth.user,
  loading: state.auth.loading,
  // status: state.auth.status, //checking if email exists
  // secretCheck: state.auth.secretCheck,
});
export default connect(mapStateToProps, { newPassword })(NewPasswordForm);
