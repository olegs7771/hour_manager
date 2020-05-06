import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UpCase } from "../../../utils/UpperCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faUserMinus,
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { deleteEmployee } from "../../../store/actions/employeeAction";
import ToolTip from "../tooltip/ToolTip";
// import TextFormGroup from "../../textForms/TextFormGroup";

class EmployeeTable extends Component {
  state = {
    showPopup: true,
    //Email for match up in Popover in Delete Employee
    email: "",
    errors: {},
    isActiveBtn: false,
  };
  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

  _deleteEmployee = (e) => {
    console.log("e", e);
    this.props.deleteEmployee({
      id: e,
    });
  };

  render() {
    return (
      <tbody>
        <tr>
          <th scope="row">
            <span style={{ color: "#f6f78b" }}>{this.props.index}</span>
          </th>
          <td>
            <span style={{ color: "#f6f78b" }}>
              {UpCase(this.props.employeeName)}
            </span>
          </td>
          <td>
            <span style={{ color: "#f6f78b" }}>{this.props.employeeEmail}</span>
          </td>
          <td>
            <span style={{ color: "#f6f78b" }}>{this.props.address}</span>
          </td>
          <td>
            <span style={{ color: "#f6f78b" }}>
              {" "}
              {this.props.employeePhone}
            </span>
          </td>
          <td>
            <span style={{ color: "#f6f78b" }}>
              {" "}
              {UpCase(this.props.projectName)}
            </span>
          </td>
          <td>
            <span style={{ color: "#f6f78b" }}> {UpCase(this.props.func)}</span>
          </td>
          <td>
            <span style={{ color: "#f6f78b" }}> {this.props.started}</span>
          </td>
          <td>
            <ToolTip
              text={
                this.props.confirmed ? (
                  <span className="text-success d-flex justify-content-center">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                ) : (
                  <span className="text-danger d-flex justify-content-center">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </span>
                )
              }
              message={this.props.confirmed ? "true" : "false"}
            />
          </td>

          <td>
            {this.props.app ? (
              <span className="text-success d-flex justify-content-center">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            ) : (
              <span className="text-danger d-flex justify-content-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </span>
            )}
          </td>
          <td
            className="btn btn-outline-info  d-flex justify-content-center"
            onClick={() =>
              this.props.history.push(`/employee_details/${this.props.id}`)
            }
            style={{ border: "none" }}
          >
            View
          </td>
        </tr>
      </tbody>
    );
  }
}
export default connect(null, { deleteEmployee })(withRouter(EmployeeTable));
