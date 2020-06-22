//Login Component
//For Recovery in PasswordRecovery.js Create New password two options:
//#1 Secret Pair Question/Answer
//#2 By SMS

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loginUser, checkEmailExists } from "../../store/actions/authAction";
import TextFormGroup from "../textForms/TextFormGroup";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    messages: {},
    loading: false,
    //for checking if  Email Exists onMouseLeave Event
    isUserStartedToFillEmailField: false,
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });

    this.setState({ errors: {} });
  };

  //Check Email on mouseLeave Event
  _onMouseLeave = () => {
    if (this.state.isUserStartedToFillEmailField) {
      console.log("checking Email");
      this.props.checkEmailExists({ email: this.state.email });
    }
  };

  _onSubmit = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const { email, password } = this.state;
    const data = {
      email,
      password,
    };
    this.props.loginUser(data, this.props.history);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, loading: false });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({ messages: this.props.messages, loading: false });
    }
    if (prevProps.auth !== this.props.auth) {
      if (this.props.auth.isAuthenticated) {
        this.setState({ loading: false });
      }
    }
    if (this.state.email !== prevState.email) {
      this.setState({ isUserStartedToFillEmailField: true });
    }
  }

  render() {
    return (
      <div className="py-3" style={{ height: 700 }}>
        <div className="my3 text-center h3 text-white">SignIn</div>
        <div className="div row">
          <div className="col-md-6 d-block mx-auto my-3">
            <div className="my-3 border rounded p-5">
              <form onSubmit={this._onSubmit}>
                <TextFormGroup
                  label={
                    <span
                      className="ml-3"
                      style={{ fontWeight: "bold", color: "#FFF" }}
                    >
                      Email
                    </span>
                  }
                  placeholder="brown@exemple.com"
                  onChange={this._onChange}
                  onMouseLeave={this._onMouseLeave}
                  value={this.state.email}
                  name="email"
                  error={this.state.errors.email}
                  type="email"
                />
                {/* Show only error email not exists onMouseLeave */}
                {this.state.errors.error ===
                "No such e-mail in our data storage" ? (
                  <div
                    className="my-3 border p-1 rounded border-danger"
                    style={{ backgroundColor: "#FFF" }}
                  >
                    <span className="text-danger ">
                      {this.state.errors.error}
                    </span>
                  </div>
                ) : null}
                <TextFormGroup
                  label={
                    <span
                      className="ml-3"
                      style={{ fontWeight: "bold", color: "#FFF" }}
                    >
                      Password
                    </span>
                  }
                  placeholder="e.g. 6-10 chars"
                  onChange={this._onChange}
                  value={this.state.password}
                  name="password"
                  error={this.state.errors.password}
                  type="password"
                />

                {this.state.errors.error !==
                  "No such e-mail in our data storage" &&
                this.state.errors.error ? (
                  <div
                    className="my-3 border p-2 rounded border-danger"
                    style={{ backgroundColor: "#FFF" }}
                  >
                    <span className="text-danger ">
                      {this.state.errors.error}
                    </span>
                  </div>
                ) : null}
                <DotLoaderSpinner loading={this.state.loading} />

                <button type="submit" className="btn btn-outline-secondary  ">
                  <span className="text-white">Submit</span>
                </button>
              </form>
            </div>
            <div className="row ">
              <div className="col-md-6  text-center">
                <span className="text-white">Not Registered yet? please </span>
                <a href="/register" className="text-white">
                  <span style={{ color: "#e5f52c" }}>SingUp</span>
                </a>
              </div>
              <div className="col-md-6  text-center">
                <a href="/recover" className="text-white">
                  <span style={{ color: "#e5f52c" }}>Forgot password?</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.errors,
  messages: state.messages.messages,
});

const mapDispatchToProps = { loginUser, checkEmailExists };

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
export default connect(mapStateToProps, mapDispatchToProps)(Login);
