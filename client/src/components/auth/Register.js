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

export class Register extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    errors: {},
    messages: {},
    submitDisabled: true,
    loading: false,
    secretQuestion: "",
    secretAnswer: "",
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });
    const { name, email, phone, password } = this.state;
    if (name !== "" && email !== "" && phone !== "" && password !== "") {
      this.setState({ submitDisabled: false });
    }
    this.setState({ errors: {} });
  };

  _onSubmit = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const {
      name,
      email,
      phone,
      secretQuestion,
      secretAnswer,
      location,
      password,
    } = this.state;
    const payload = {
      name,
      email,
      phone,
      location,
      password,
      secretQuestion,
      secretAnswer,
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
      console.log("message came success registration!");
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
            {/* Secret Question/Answer */}
            <div className="row ">
              <div className="col-md-6 ">
                <input
                  type="text"
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 5,
                    borderStyle: "none",
                    textAlign: "center",
                  }}
                  value={this.state.secretQuestion}
                  name="secretQuestion"
                  onChange={this._onChange}
                  placeholder="My first car brand?"
                />
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
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 5,
                    borderStyle: "none",
                    textAlign: "center",
                  }}
                  value={this.state.secretAnswer}
                  name="secretAnswer"
                  onChange={this._onChange}
                  placeholder="Tayota"
                />
                {this.state.errors.secretAnswer && (
                  <div className="pl-4">
                    <small className="text-danger">
                      {this.state.errors.secretAnswer}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <small className="text-white">
              With a secret question and the answer you can recover the Account
            </small>

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

            <button
              type="submit"
              // disabled={this.state.submitDisabled}
              className="btn btn-outline-secondary  "
            >
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
