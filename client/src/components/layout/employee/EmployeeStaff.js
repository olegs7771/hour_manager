import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllEmployees } from "../../../store/actions/employeeAction";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
import { isEmpty } from "../../../utils/isEmpty";
import EmployeeTable from "./EmployeeTable";

export class EmployeeStaff extends Component {
  state = {
    employees: []
  };

  componentDidMount() {
    this.props.getAllEmployees({ id: this.props.match.params.id });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.employees !== this.props.employees) {
      this.setState({
        employees: this.props.employees
      });
    }
  }

  render() {
    if (this.props.loading || this.props.employees === null) {
      return (
        <div className="mx-auto" style={{ paddingTop: "30%" }}>
          <HashLoaderSpinner loading={true} />
        </div>
      );
    } else if (isEmpty(this.state.employees)) {
      console.log("this.state.employees", this.state.employees);

      return <div className="my-4">No Employees to show</div>;
    } else {
      return (
        <div className="my-4  ">
          <div className="h5 text-center my-3">Employee Table</div>
          {/* table */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            {this.props.employees.map(employee => (
              <EmployeeTable
                key={employee._id}
                employeeName={employee.employeeName}
                employeeEmail={employee.employeeEmail}
                confirmed={employee.confirmed}
                date={employee.date}
                projectName={employee.projectName}
              />
            ))}
          </table>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.employees.loading,
  employees: state.employees.employees
});

const mapDispatchToProps = { getAllEmployees };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeStaff));
