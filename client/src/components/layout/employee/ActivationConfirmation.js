import React, { Component } from "react";
import { connect } from "react-redux";
import { activEmp, sendEmail } from "../../../store/actions/employeeAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";

class ActivationConfirmation extends Component {
  state = {
    message: null,

    error: null,
    loading: true,
  };

  async componentDidMount() {
    const uid = await this.props.match.params.uid;
    const projectID = await this.props.match.params.projectID;
    this.props.activEmp({ uid, projectID });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message ? this.props.message : null,
        loading: false,
      });
    }
    if (prevProps.activatedEmployee !== this.props.activatedEmployee) {
      if (this.props.activatedEmployee) {
        const payload = {
          name: this.props.activatedEmployee.name,
          code: this.props.activatedEmployee.code,
          email: this.props.activatedEmployee.email,
        };

        this.props.sendEmail(payload);
      }
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
          style={{
            paddingTop: "10%",
            paddingBottom: "30%",
          }}
        >
          <div className="p-4 rounded" style={{ backgroundColor: "#084f1b" }}>
            <span className="text-left  text-white">{this.state.message}</span>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  message: state.messages.messages,
  error: state.errors.errors.error,
  activatedEmployee: state.employees.activatedEmployee,
});

export default connect(mapStateToProps, { activEmp, sendEmail })(
  ActivationConfirmation
);
