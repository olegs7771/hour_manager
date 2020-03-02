import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployee } from "../../../store/actions/employeeAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { UpCase } from "../../../utils/UpperCase";
import ReactNbsp from "react-nbsp";

export class EmployeeDetails extends Component {
  componentDidMount() {
    this.props.getEmployee({ id: this.props.match.params.id });
  }

  render() {
    if (this.props.loading || this.props.selectedEmployee === null) {
      return (
        <div className="mx-auto " style={{ paddingTop: "30%" }}>
          <DotLoaderSpinner />
        </div>
      );
    } else {
      return (
        <div className="my-4 border">
          <div className="my-4 h5 text-center">
            <span className="display-4">Profile Employee Details</span>
          </div>
          <div className="mx-3 border row">
            <div className="col-md-4 ">
              <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder">Name</span>

                  <span>{UpCase(this.props.selectedEmployee.name)}</span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder">Email</span>

                  <span>{this.props.selectedEmployee.email}</span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder">Address</span>

                  <span>{UpCase(this.props.selectedEmployee.address)}</span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder">Phone</span>

                  <span>{UpCase(this.props.selectedEmployee.phone)}</span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder">Function</span>

                  <span>{UpCase(this.props.selectedEmployee.func)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder">Started Job</span>

                  <span className="">
                    {UpCase(this.props.selectedEmployee.started)}
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-4 "></div>
            <div className="col-md-4 "></div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedEmployee: state.employees.selectedEmployee
});

const mapDispatchToProps = { getEmployee };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeDetails));
