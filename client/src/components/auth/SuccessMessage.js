import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmUser } from "../../store/actions/authAction";
import { withRouter } from "react-router-dom";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";

export class SuccessMessage extends Component {
  state = {
    loading: false,
    errors: {},
    confirmed_user: null
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
        confirmed_user: true
      });
    }
    if (prevProps.confirmed_user !== this.props.confirmed_user) {
      this.setState({
        confirmed_user: this.props.confirmed_user,
        loading: false
      });
    }
  }

  render() {
    if (this.state.loading || this.state.confirmed_user === null) {
      return (
        <div className="my-5">
          <DotLoaderSpinner />
        </div>
      );
    } else if (this.state.errors.error) {
      return (
        <div className="my-3 border rounded p-4">
          <div className="text-center h6">{this.state.errors.error}</div>
        </div>
      );
    } else {
      return (
        <div className="my-3 border rounded">
          <div className="text-center my-3 display-4">Success!</div>
          <div className="my-3 border rounded pl-4">
            Dear {this.state.confirmed_user.name}Thank you for registration{" "}
            <br />
            Please save your credentials for further Login
            <div className="my-3 border rounded">
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

const mapStateToProps = state => ({
  errors: state.errors.errors,
  loading: state.auth.loading,
  confirmed_user: state.auth.confirmed_user
});

const mapDispatchToProps = { confirmUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SuccessMessage));
