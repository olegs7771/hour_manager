import React, { Component } from "react";
import { connect } from "react-redux";
import { activEmp } from "../../../store/actions/employeeAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";

class ActivationConfirmation extends Component {
  state = {
    message: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { uid, projectID } = this.props.match.params;
    this.props.activEmp({ uid, projectID });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message ? this.props.message : null,
        loading: false,
      });
    }
    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error ? this.props.error : null,
        loading: false,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div
          className="my-4"
          style={{ paddingTop: "10%", paddingBottom: "30%" }}
        >
          <DotLoaderSpinner />
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div
          className="my-4"
          style={{ paddingTop: "10%", paddingBottom: "30%" }}
        >
          <div className="text-center text-danger h6">{this.state.error}</div>
        </div>
      );
    }
    if (this.state.message) {
      return (
        <div
          className="my-4"
          style={{ paddingTop: "10%", paddingBottom: "30%" }}
        >
          <div className="text-center text-success h6">
            {this.state.message}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  message: state.messages.messages.message,
  error: state.errors.errors.error,
});

export default connect(mapStateToProps, { activEmp })(ActivationConfirmation);
