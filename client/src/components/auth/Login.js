import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authAction";
import TextFormGroup from "../textForms/TextFormGroup";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    messages: {},
    submitDisabled: true,
    loading: false
  };

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
    const { name, email, password } = this.state;
    if (email !== "" && password !== "") {
      this.setState({ submitDisabled: false });
    }
    this.setState({ errors: {} });
  };

  _onSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    const { email, password } = this.state;
    const data = {
      email,
      password
    };
    await this.props.loginUser(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, loading: false });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({ messages: this.props.messages, loading: false });
    }
  }

  render() {
    return (
      <div className="div my-2">
        <form onSubmit={this._onSubmit}>
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

const mapDispatchToProps = { loginUser };

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
