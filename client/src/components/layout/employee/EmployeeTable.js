import React, { Component } from "react";
import { UpCase } from "../../../utils/UpperCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMinus,
  faCheck,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { deleteEmployee } from "../../../store/actions/employeeAction";
import Popup from "../popup/Popup";
import TextFormGroup from "../../textForms/TextFormGroup";

class EmployeeTable extends Component {
  state = {
    showPopup: true
  };
  _toggle = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

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

          <td className="btn btn-outline-secondary d-block m-1">
            <Popup
              icon={<FontAwesomeIcon icon={faUserMinus} />}
              container={
                <div className="text-danger">
                  If Deleted all Employee Info will be lost Please Provide
                  Employee Email to Proceed
                  <TextFormGroup />
                  <button
                    className="btn btn-outline-danger"
                    onClick={this._deleteEmployee.bind(this, this.props.id)}
                  >
                    Confirm
                  </button>
                </div>
              }
              title={
                <div className="text-danger text-center">Delete Employee</div>
              }
              color={{ backgroundColor: "red" }}
            />
          </td>
        </tr>
      </tbody>
    );
  }
}
export default connect(null, { deleteEmployee })(EmployeeTable);
