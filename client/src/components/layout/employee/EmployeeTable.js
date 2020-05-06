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
import Popup from "../popup/Popup";
// import TextFormGroup from "../../textForms/TextFormGroup";

class EmployeeTable extends Component {
  state = {
    showPopup: true,
    //Email for match up in Popover in Delete Employee
    email: "",
    errors: {},
    isActiveBtn: false,
    //toggle popups on mouse hover on icons
    openConfirmedPopup: false,
    openConfirmedPopup: false,
    text: "", //text to show in popups
    // openAppPopupTrue: false,
    // openAppPopupFalse: false,
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
  //Toggle PopUps
  _openPopupConfirmed = (e) => {
    console.log("e open", e);

    this.setState({
      openConfirmedPopup: true,
      text: e
        ? "Employee was notified by email and activated App"
        : "Employee did not activated App yet",
    });
  };
  _closePopupConfirmed = (e) => {
    console.log("close popup");

    this.setState({ openConfirmedPopup: false });
  };

  render() {
    //Cretae Popup icon info hover content
    let popupContent;
    if (this.state.openConfirmedPopup) {
      popupContent = <Popup body={<div></div>} />;
    } else {
      popupContent = null;
    }

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
          <td
            onMouseLeave={this._closePopupConfirmed.bind(
              this,
              this.props.confirmed
            )}
          >
            {popupContent}
            {this.props.confirmed ? (
              <span className="text-success d-flex justify-content-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  onMouseEnter={this._openPopupConfirmed.bind(
                    this,
                    this.props.confirmed
                  )}
                />
              </span>
            ) : (
              <span className="text-danger d-flex justify-content-center">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  onMouseEnter={this._openPopupConfirmed.bind(
                    this,
                    this.props.confirmed
                  )}
                />
              </span>
            )}
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
