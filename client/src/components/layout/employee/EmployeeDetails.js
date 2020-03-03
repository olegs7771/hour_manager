import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getEmployee,
  deleteEmployee
} from "../../../store/actions/employeeAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { UpCase } from "../../../utils/UpperCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMinus,
  faCheck,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../popup/Popup";
import TextFormGroup from "../../textForms/TextFormGroup";

export class EmployeeDetails extends Component {
  //State for popover Email Confirmation for delete btn
  state = {
    email: "",
    match: false,
    open: false,
    closePopover: false
  };
  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      if (this.state.email === this.props.selectedEmployee.email) {
        this.setState({ match: true });
      } else {
        this.setState({ match: false });
      }
    }
  }

  componentDidMount() {
    this.props.getEmployee({ id: this.props.match.params.id });
  }

  _deleteEmployee = e => {
    console.log("e", e);
    this.props.deleteEmployee({
      data: e
    });
  };

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
                <li className="list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder">Confirmed</span>

                  <span className="">
                    {this.props.selectedEmployee.confirmed ? (
                      <span className="text-success">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    ) : (
                      <span className="text-danger">
                        {" "}
                        <FontAwesomeIcon icon={faExclamationCircle} />
                      </span>
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-8 border">
              <div className="text-center h5">Statistics</div>
            </div>
          </div>
          <div className="my-3 border d-flex justify-content-center ">
            <div className="my-3 btn-group">
              <button className="btn btn-outline-info">Edit Profile</button>
              <Popup
                open={this.state.open}
                icon="Delete Profile"
                margin={10}
                title={<span className="text-danger pl-5">Delete Warning</span>}
                placement={"top"}
                body={
                  <div className=" mx-auto ">
                    <span className="text-danger">
                      All Data will be deleted permanently <br />
                      To proceed fill Employee's Email
                    </span>
                    <TextFormGroup
                      placeholder="Employee Email.."
                      onChange={this._onChange}
                      value={this.state.email}
                      name="email"
                      type="email"
                    />
                    <button
                      className="btn btn-outline-danger"
                      disabled={!this.state.match}
                      onClick={this._deleteEmployee.bind(
                        this,
                        this.props.selectedEmployee._id
                      )}
                    >
                      Confirm
                    </button>
                    {this.state.match ? (
                      <span className="text-success ml-5">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    ) : null}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedEmployee: state.employees.selectedEmployee
});

const mapDispatchToProps = { getEmployee, deleteEmployee };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeDetails));
