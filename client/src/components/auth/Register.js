import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFormGroup from "../textForms/TextFormGroup";
import { registerUser } from "../../store/actions/authAction";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";
import "../../App.css";

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
    loading: false
  };

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
    const { name, email, phone, password } = this.state;
    if (name !== "" && email !== "" && phone !== "" && password !== "") {
      this.setState({ submitDisabled: false });
    }
    this.setState({ errors: {} });
  };

  _onSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    const { name, email, phone, location, password } = this.state;
    const data = {
      name,
      email,
      phone,
      location,
      password
    };
    await this.props.registerUser(data);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, loading: false });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: this.props.messages,
        loading: false,
        errors: {}
      });
      console.log("message came success registration!");
    }
  }

  render() {
    return (
      <div className="div my-2">
        <form onSubmit={this._onSubmit}>
          <TextFormGroup
            label="Name"
            placeholder="John Brown"
            onChange={this._onChange}
            value={this.state.name}
            name="name"
            error={this.state.errors.name}
          />
          <TextFormGroup
            label="Email"
            placeholder="brown@exemple.com"
            onChange={this._onChange}
            value={this.state.email}
            name="email"
            error={this.state.errors.email}
            type="email"
          />
          <TextFormGroup
            label="Phone"
            placeholder="0501234455"
            onChange={this._onChange}
            value={this.state.phone}
            name="phone"
            error={this.state.errors.phone}
            type="phone"
          />
          <TextFormGroup
            label="Location"
            placeholder="city,state"
            onChange={this._onChange}
            value={this.state.location}
            name="location"
            error={this.state.errors.location}
          />
          <TextFormGroup
            label="Password"
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
            disabled={this.state.submitDisabled}
            className="btn btn-outline-secondary  "
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.errors,
  messages: state.messages.messages
});

const mapDispatchToProps = { registerUser };

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
