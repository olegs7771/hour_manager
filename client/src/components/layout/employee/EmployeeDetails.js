//From CreateateNewJobday.js  we pick date on Calendar

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getEmployee,
  deleteEmployee,
} from "../../../store/actions/employeeAction";
import { getSelectedProject } from "../../../store/actions/projectAction";

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
import TotalJobHours from "../jobhours/TotalJobHours";

import CreateNewJobday from "../jobhours/CreateNewJobday";

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
    selectedProject: {},
    selectedEmployeeDetails: null,
    loading: null,
    showDay: false,
    showMonth: false,
    //toggle Button Delete Profile/Cancel. True or false coming from Popup.js
    switchBtn: false,
    //Show Create Jobday coming from EmployeeControls
    showCreateJobday: false,
    pickDate: false,
    isShowCreateDay: false,
    //For Jobday to reload mnth after finished to create new jobday
    jobDayCreated: null,
  };
  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  //Comes from Jobday.js when user clicks view button
  _showDateChild = (state) => {
    this.setState({ showDay: state });
  };

  //Comes from CreateNewJobday to close
  _closeChildCreateNewJobday = () => {
    //reload month in Jobday
    this.setState({ jobDayCreated: true });
    this.setState({ showCreateJobday: false });
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
    //Selected project
    if (this.props.selectedProject !== prevProps.selectedProject) {
      this.setState({ selectedProject: this.props.selectedProject });
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
      //go back to Employees List
      setTimeout(() => {
        this.props.history.push(
          `/employees/${this.props.selectedEmployee.projectID}`
        );
      }, 3000);
    }
    if (this.state.showCreateJobday !== prevState.showCreateJobday) {
      this.setState({ pickDate: this.state.showCreateJobday });
    }
  }

  componentDidMount() {
    this.props.getEmployee({ id: this.props.match.params.employeeID });
    this.props.getSelectedProject({ id: this.props.match.params.projectID });
  }

  _deleteEmployee = (e) => {
    console.log("e", e);
    this.props.deleteEmployee({
      id: e,
    });
  };

  //bring btn state from Popover
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
          <div
            className="rounded p-4 text-center border mx-auto"
            style={{ backgroundColor: "#023802", width: "50%" }}
          >
            <span className="text-white ">{this.state.messages.message}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={window.innerWidth < 500 ? "py-1 " : "py-5 pl-5 px-4"}>
          {window.innerWidth < 500 ? (
            <div className=" text-center ">
              <span className=" text-white">Employee Dashboard Mobile</span>
            </div>
          ) : (
            <div className="my-4 text-center">
              <span className="h5 text-white">Employee Dashboard</span>
            </div>
          )}

          <div
            className={
              window.innerWidth < 500
                ? " row  d-flex justify-content-between "
                : "row  d-flex justify-content-between my-5"
            }
          >
            <div className="col-md-3  ">
              <ul className="list-group list-group-flush  border rounded">
                <li className="list-group-item list-group-item d-flex justify-content-between ">
                  <span className="font-weight-bolder small">Name</span>

                  <span className="small pr-3">
                    {UpCase(this.props.selectedEmployee.name)}
                  </span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder small">Email</span>

                  <span className="small pr-3">
                    {this.props.selectedEmployee.email}
                  </span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder small">Address</span>

                  <span className="small pr-3">
                    {UpCase(this.props.selectedEmployee.address)}
                  </span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder small">Phone</span>

                  <span className="small pr-3">
                    {UpCase(this.props.selectedEmployee.phone)}
                  </span>
                </li>
                <li className="list-group-item list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder small">Function</span>

                  <span className="small pr-3">
                    {UpCase(this.props.selectedEmployee.func)}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder small">Started Job</span>

                  <span className="small pr-3">
                    {UpCase(this.props.selectedEmployee.started)}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="font-weight-bolder small">
                    Confirmed by Email
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
                <li className="list-group-item d-flex justify-content-between">
                  <span className="font-italic" style={{ fontSize: 12 }}>
                    App Code
                  </span>
                  <span>{this.props.selectedEmployee.code}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="font-italic" style={{ fontSize: 12 }}>
                    Project Code
                  </span>
                  <span>{this.state.selectedProject.projectCode}</span>
                </li>
              </ul>
            </div>
            <div
              className={
                window.innerWidth < 500 ? "col-md-3  " : "col-md-3 pl-3  "
              }
            >
              <Calendar
                showDay={this.state.showDay}
                showMonth={this.state.showMonth}
                //To pick a date for CreateNewJobday.js
                pickDate={this.state.pickDate}
              />
            </div>
            <div className="col-md-6 border">
              {/* Button Create NewJobday */}
              <div className=" py-3 px-5">
                <input
                  type="button"
                  value={!this.state.showCreateJobday ? "Create Day" : "Close"}
                  style={{ width: 100 }}
                  className="btn btn-primary"
                  onClick={() =>
                    this.setState({
                      showCreateJobday: !this.state.showCreateJobday,
                    })
                  }
                />
              </div>

              {/* Create Jobday by manager */}
              {this.state.showCreateJobday && (
                <CreateNewJobday
                  selectedEmployeeDetails={this.state.selectedEmployeeDetails}
                  //close in EmployeeControls createnewjobday
                  close={this._closeChildCreateNewJobday}
                />
              )}

              <Jobday
                employee={this.state.selectedEmployeeDetails}
                showDay={this.state.showDay}
                //Show Day from child
                showDayChild={this._showDateChild}
                jobDayCreated={this.state.jobDayCreated}
              />
            </div>
            <TotalJobHours />
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
  selectedProject: state.projects.selectedProject,
  selectedDay: state.jobday.selectedDay,
  errors: state.errors.errors,
  loading: state.employees.loading,
  messages: state.messages.messages,
});

const mapDispatchToProps = { getEmployee, deleteEmployee, getSelectedProject };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeDetails));
