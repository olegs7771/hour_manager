import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployee } from "../../../store/actions/employeeAction";

export class EmployeeDetails extends Component {
  componentDidMount() {
    this.props.getEmployee({ id: this.props.match.params.id });
  }

  render() {
    return (
      <div className="my-4 borde">
        <div className="my-4 h5 text-center">{this.props.selectedEmployee}</div>
      </div>
    );
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
