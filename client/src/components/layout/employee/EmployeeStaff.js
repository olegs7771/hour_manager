import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllEmployees } from "../../../store/actions/employeeAction";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
import { isEmpty } from "../../../utils/isEmpty";

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
      return <div>Employes here1</div>;
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
