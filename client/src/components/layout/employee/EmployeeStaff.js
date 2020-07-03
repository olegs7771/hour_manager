import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllEmployees } from "../../../store/actions/employeeAction";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
import { isEmpty } from "../../../utils/isEmpty";
import EmployeeTable from "./EmployeeTable";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   // faUserMinus,
//   faLongArrowAltRight,
//   faExclamationCircle,
//   faCheck,
// } from "@fortawesome/free-solid-svg-icons";

// import ReactNbsp from "react-nbsp";

export class EmployeeStaff extends Component {
  state = {
    employees: [],
  };

  componentDidMount() {
    this.props.getAllEmployees({ id: this.props.match.params.id });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.employees !== this.props.employees) {
      this.setState({
        employees: this.props.employees,
      });
    }
  }

  render() {
    if (this.props.loading || this.props.employees === null) {
      return (
        <div
          className="mx-auto"
          style={{ paddingTop: "30%", paddingBottom: "30%" }}
        >
          <HashLoaderSpinner loading={true} />
        </div>
      );
    } else {
      if (isEmpty(this.props.employees)) {
        return (
          <div
            className="my-3 text-center h5 text-white"
            style={{ paddingTop: "10%", paddingBottom: "30%", height: 700 }}
          >
            No Employees in this Project
          </div>
        );
      }
      return (
        <div
          style={{ height: this.props.employees.length < 10 ? 700 : "auto" }}
        >
          <div className="h5 text-center my-3 text-white">Employee Table</div>

          {/* table */}
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col">
                  <span className="text-white"> #</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Name</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Email</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Address</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Phone</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Project</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Function</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Started Job</span>
                </th>
                <th scope="col ">
                  <span className="text-white">Confirmed</span>
                </th>
                <th scope="col ">
                  <span className="text-white">App</span>
                </th>
                <th scope="col ">
                  <span className="text-white">View</span>
                </th>
              </tr>
            </thead>
            {this.props.employees.map((employee, index) => (
              <EmployeeTable
                key={employee._id}
                id={employee._id}
                employeeName={employee.employeeName}
                employeeEmail={employee.employeeEmail}
                employeePhone={employee.employeePhone}
                confirmed={employee.confirmed}
                date={employee.date}
                projectName={employee.projectName}
                started={employee.started}
                address={employee.address}
                func={employee.func}
                index={index + 1}
                app={employee.app}
              />
            ))}
          </table>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loading: state.employees.loading,
  employees: state.employees.employees,
});

const mapDispatchToProps = { getAllEmployees };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeStaff));
