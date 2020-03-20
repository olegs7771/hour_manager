import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmUser } from "../../store/actions/authAction";
import { withRouter } from "react-router-dom";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";

export class SuccessMessage extends Component {
  state = {
    loading: false,
    messages: {},
    errors: {}
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
      this.setState({ errors: this.props.errors, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="my-5">
          <DotLoaderSpinner />
        </div>
      );
    }

    if (this.state.errors) {
      return (
        <div className="my-3 border rounded p-4">
          <div className="text-center h6">{this.state.errors.error}</div>
        </div>
      );
    }
    if (this.state.message) {
      return (
        <div className="my-3 border rounded">
          <div className="text-center my-3 display-4">Success!</div>
          <div className="my-3 border rounded">
            <p>Dear User {this.props.match.params.id}</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  loading: state.auth.loading
});

const mapDispatchToProps = { confirmUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SuccessMessage));
