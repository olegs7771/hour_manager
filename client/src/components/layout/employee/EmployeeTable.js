import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UpCase } from "../../../utils/UpperCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faUserMinus,
  faCheck,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { deleteEmployee } from "../../../store/actions/employeeAction";
// import Popup from "../popup/Popup";
// import TextFormGroup from "../../textForms/TextFormGroup";

class EmployeeTable extends Component {
  state = {
    showPopup: true,
    //Email for match up in Popover in Delete Employee
    email: "",
    errors: {},
    isActiveBtn: false
  };
  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (this.state.email === this.props.employeeEmail) {
      console.log("match");

      this.setState({ isActiveBtn: true });
    }
    if (this.state.email !== this.props.employeeEmail) {
      this.setState({ isActiveBtn: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isActiveBtn !== this.state.isActiveBtn) {
      this.setState({ isActiveBtn: true });
    }
  }

  _deleteEmployee = e => {
    console.log("e", e);
    this.props.deleteEmployee({
      id: e
    });
  };

  render() {
    return (
      <tbody>
        <tr>
          <th scope="row">{this.props.index}</th>
          <td>{UpCase(this.props.employeeName)}</td>
          <td>{this.props.employeeEmail}</td>
          <td>{this.props.address}</td>
          <td>{this.props.employeePhone}</td>
          <td>{UpCase(this.props.projectName)}</td>
          <td>{UpCase(this.props.func)}</td>
          <td>{this.props.started}</td>
          <td>
            {this.props.confirmed ? (
              <span className="text-success d-flex justify-content-center">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            ) : (
              <span className="text-danger d-flex justify-content-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </span>
            )}
          </td>
          <td>app</td>
          <td
            className="btn btn-outline-info d-block"
            onClick={() =>
              this.props.history.push(`/employee_details/${this.props.id}`)
            }
          >
            View
          </td>
        </tr>
      </tbody>
    );
  }
}
export default connect(null, { deleteEmployee })(withRouter(EmployeeTable));
