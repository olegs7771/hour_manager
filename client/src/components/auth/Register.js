import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFormGroup from "../textForms/TextFormGroup";
import { registerUser } from "../../store/actions/authAction";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";
import "../../App.css";
//Phone Input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./auth.css";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    errors: {},
    messages: {},
    loading: false,
    secretQuestion1: "Your first car's brand?",
    secretAnswer1: "",
    secretQuestion2: "Your mother's middle name?",
    secretAnswer2: "",
  };

  _onChange = (e) => {
    console.log("e.target.vlue", e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });

    this.setState({ errors: {} });
  };

  _onSubmit = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const {
      name,
      email,
      phone,
      secretQuestion1,
      secretAnswer1,
      secretQuestion2,
      secretAnswer2,
      location,
      password,
    } = this.state;
    const payload = {
      name,
      email,
      phone,
      location,
      password,
      secretQuestion1,
      secretAnswer1,
      secretQuestion2,
      secretAnswer2,
    };
    console.log("payload", payload);

    this.props.registerUser(payload);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, loading: false });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: this.props.messages,
        loading: false,
        errors: {},
      });
      setTimeout(() => {
        this.props.history.push("/");
      }, 4000);
    }
    //Check if  the picked Secret Answers not the same
    if (this.state.secretQuestion2 !== prevState.secretQuestion2) {
      if (this.state.secretQuestion2 === this.state.secretQuestion1) {
        this.setState({
          errors: { secretQuestion: " Same  question." },
        });
      }
    }
    if (this.state.secretQuestion1 !== prevState.secretQuestion1) {
      if (this.state.secretQuestion1 === this.state.secretQuestion2) {
        this.setState({
          errors: { secretQuestion: " Same  question." },
        });
      }
    }
  }

  render() {
    return (
      <div className="py-3">
        <div className="my3 text-center h3 text-white">SignUp</div>

        <div
          className={
            window.innerWidth > 500
              ? "my-3 border rounded p-5 mx-auto"
              : "my-3 border rounded mx-auto"
          }
          style={{ width: window.innerWidth > 500 ? "50%" : "100%" }}
        >
          <form onSubmit={this._onSubmit}>
            <TextFormGroup
              label={
                <span
                  className="ml-3"
                  style={{ fontWeight: "bold", color: "#FFF" }}
                >
                  Name
                </span>
              }
              placeholder="John Brown"
              onChange={this._onChange}
              value={this.state.name}
              name="name"
              error={this.state.errors.name}
            />
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
              value={this.state.email}
              name="email"
              error={this.state.errors.email}
              type="email"
            />
            {/* Module */}
            <span
              className="ml-3 "
              style={{ fontWeight: "bold", color: "#FFF" }}
            >
              Phone
            </span>
            <PhoneInput
              country={"il"}
              value={this.state.phone}
              onChange={(phone) => this.setState({ phone })}
              style={{ marginTop: 10 }}
            />
            {this.state.errors.phone && (
              <div className="pl-4">
                <small className="text-danger">{this.state.errors.phone}</small>
              </div>
            )}
            <small className="text-white">
              In case you forgot the password , you can recover your account's
              login and password with sms text.
            </small>

            <br />
            <br />
            <small className="text-white">
              With a secret questions and the answers you can recover the
              Account.
            </small>
            <br />
            <br />
            {/* Secret Question/Answer */}
            <div className="row ">
              <div className="col-md-6 ">
                <select
                  value={this.state.secretQuestion1}
                  onChange={this._onChange}
                  name="secretQuestion1"
                  className="field"
                >
                  <option value="Your first car's brand?">
                    {this.state.secretQuestion1}
                  </option>
                  <option value="Your mother's middle name?">
                    Your mother middle name?
                  </option>
                  <option value="Your first pet's name?">
                    Your first pet name?
                  </option>
                  <option value="City of your birth?">
                    City of your birth?
                  </option>
                </select>

                {this.state.errors.secretQuestion && (
                  <div className="pl-4">
                    <small className="text-danger">
                      {this.state.errors.secretQuestion}
                    </small>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  value={this.state.secretAnswer1}
                  name="secretAnswer1"
                  onChange={this._onChange}
                  placeholder="Answer"
                  className="field"
                />
                {this.state.errors.secretAnswer1 && (
                  <div className="pl-4">
                    <small className="text-danger">
                      {this.state.errors.secretAnswer1}
                    </small>
                  </div>
                )}
              </div>
            </div>
            {/*2 Secret Question/Answer */}
            <div className="row mt-1">
              <div className="col-md-6 ">
                <select
                  value={this.state.secretQuestion2}
                  onChange={this._onChange}
                  name="secretQuestion2"
                  className="field"
                >
                  <option value="Your mother's middle name?">
                    {this.state.secretQuestion2}
                  </option>
                  <option value="Your first car's brand?">
                    Your first car's brand?
                  </option>
                  <option value="Your first pet's name?">
                    Your first pet name?
                  </option>
                  <option value="City of your birth?">
                    City of your birth?
                  </option>
                </select>

                {this.state.errors.secretQuestion && (
                  <div className="pl-4">
                    <small className="text-danger">
                      {this.state.errors.secretQuestion}
                    </small>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  value={this.state.secretAnswer2}
                  name="secretAnswer2"
                  onChange={this._onChange}
                  placeholder="Answer"
                  className="field"
                />
                {this.state.errors.secretAnswer2 && (
                  <div className="pl-4">
                    <small className="text-danger">
                      {this.state.errors.secretAnswer2}
                    </small>
                  </div>
                )}
              </div>
            </div>

            <TextFormGroup
              label={
                <span
                  className="ml-3"
                  style={{ fontWeight: "bold", color: "#FFF" }}
                >
                  Location
                </span>
              }
              placeholder="city,state"
              onChange={this._onChange}
              value={this.state.location}
              name="location"
              error={this.state.errors.location}
            />
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
            {this.state.messages.message ? (
              <div className="text-success mb-3">
                {this.state.messages.message}
              </div>
            ) : null}
            {this.state.errors.error ? (
              <div className="text-danger mb-3">{this.state.errors.error}</div>
            ) : null}
            <DotLoaderSpinner loading={this.state.loading} />

            <button type="submit" className="btn btn-outline-secondary  ">
              <span className="text-white">Submit</span>
            </button>
          </form>
          <span className="text-white small">Please fill all fields.</span>
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

const mapDispatchToProps = { registerUser };

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
