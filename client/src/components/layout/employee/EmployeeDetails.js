import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getEmployee,
  deleteEmployee,
} from "../../../store/actions/employeeAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { UpCase } from "../../../utils/UpperCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faUserMinus,
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../popup/Popup";
import TextFormGroup from "../../textForms/TextFormGroup";
import Calendar from "../calendar";
import Jobday from "../jobhours/Jobday";
//Control Options
import EmployeeControls from "./EmployeeControls";

export class EmployeeDetails extends Component {
  //State for popover Email Confirmation for delete btn
  state = {
    name: "",
    email: "",
    address: "",
    phone: "",
    func: "",
    started: "",
    errors: {},
    messages: {},
    match: false,
    selectedEmployee: null,
    selectedEmployeeDetails: null,
    loading: null,
    showDay: false,
    showMonth: false,
    //toggle Button Delete Profile/Cancel. True or false coming from Popup.js
    switchBtn: false,
  };
  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };
  _showDate = () => {
    return console.log("date");
  };

  //Functions listens for change in <EmployeeControls />

  _showDate = (childData) => {
    this.setState({
      showDay: childData.showDay,
      showMonth: childData.showMonth,
    });
  };
  //Comes from Jobday.js when user clicks view button
  _showDateChild = (state) => {
    this.setState({ showDay: state });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      if (this.state.email === this.props.selectedEmployee.email) {
        this.setState({ match: true });
      } else {
        this.setState({ match: false });
      }
    }
    if (prevProps.selectedEmployee !== this.props.selectedEmployee) {
      this.setState({
        selectedEmployee: this.props.selectedEmployee ? true : null,
        selectedEmployeeDetails: this.props.selectedEmployee,
      });
    }

    // GET Errors in State
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, selectedEmployee: true });
    }

    // GET Loading in State
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading ? true : null });
    }
    // GET Messages in State
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: this.props.messages,
        selectedEmployee: true,
        loading: null,
      });
    }
  }

  componentDidMount() {
    this.props.getEmployee({ id: this.props.match.params.id });
  }

  _deleteEmployee = (e) => {
    console.log("e", e);
    this.props.deleteEmployee({
      id: e,
    });
  };
  _changeBtn = (e) => {
    console.log("e change btn", e);
    this.setState({ switchBtn: e ? true : false });
  };

  render() {
    if (this.state.loading || this.state.selectedEmployee === null) {
      return (
        <div
          className="mx-auto "
          style={{ paddingTop: "30%", paddingBottom: "30%" }}
        >
          <DotLoaderSpinner />
        </div>
      );
    } else if (this.state.errors.error) {
      return (
        <div
          className="my-4"
          style={{ paddingTop: "10%", paddingBottom: "50%" }}
        >
          <div className="text-center text-danger h6">
            {this.state.errors.error}
          </div>
        </div>
      );
    } else if (this.state.messages.message) {
      return (
        <div
          className="my-4"
          style={{ paddingTop: "10%", paddingBottom: "50%" }}
        >
          <div className="rounded p-4" style={{ backgroundColor: "#023802" }}>
            <span className="text-white text-center">
              {this.state.messages.message}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="my-4 ">
          <div className="my-4 h5 text-center">
            <span className="display-4">Profile Employee Details</span>
          </div>
          <div className="mx-3 row">
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
                  <span className="font-weight-bolder">Confirmed by Email</span>

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
                <li className="list-group-item d-flex justify-content-between">
                  <span className="font-italic" style={{ fontSize: 12 }}>
                    Code for login in App
                    <br />
                    In Case if lost
                  </span>
                  <span className="font-weight-bolder">
                    {this.props.selectedEmployee.code}
                  </span>

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
            <div className="col-md-8 ">
              {/* Select To show Day or Month */}
              <EmployeeControls parentCB={this._showDate} />

              <div className="row">
                <div className="col-md-5 ">
                  <Calendar
                    showDay={this.state.showDay}
                    showMonth={this.state.showMonth}
                  />
                </div>
                <div className="col-md-7 ">
                  <Jobday
                    employee={this.state.selectedEmployeeDetails}
                    showDay={this.state.showDay}
                    //Show Day from child
                    showDayChild={this._showDateChild}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-3  d-flex justify-content-center ">
            <div className="my-3 btn-group">
              <button
                className="btn btn-outline-info"
                onClick={() =>
                  this.props.history.push(
                    `/employee_edit/${this.props.selectedEmployee._id}`
                  )
                }
              >
                Edit Profile
              </button>
              <Popup
                // open={this.state.open}

                icon={this.state.switchBtn ? "Cancel" : "Delete Profile"}
                margin={10}
                title={<span className="text-danger pl-5">Delete Warning</span>}
                placement={"top"}
                //toggle Button Delete Profile/Cancel
                open={this._changeBtn}
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

const mapStateToProps = (state) => ({
  selectedEmployee: state.employees.selectedEmployee,
  errors: state.errors.errors,
  loading: state.employees.loading,
  messages: state.messages.messages,
});

const mapDispatchToProps = { getEmployee, deleteEmployee };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeDetails));
