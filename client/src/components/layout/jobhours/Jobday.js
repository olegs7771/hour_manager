//This Component is a Child of EmployeeDetails.js
// Shows Table of selectedMonth or single selectedDay

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Scrollbar from "react-scrollbars-custom";

import {
  managerConfirm,
  managerCancelConfirm,
  selectMonth,
  selectDay,
} from "../../../store/actions/jobdayAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import moment from "moment";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faUserMinus,
  faCheck,
  faExclamationCircle,
  faCheckDouble,
  faArrowUp,
  faArrowDown,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

import ToolTip from "../tooltip/ToolTip";
import JobdayEditManager from "./JobdayEditManager";

//Get Month Function
const getMonth = (employeeID, projectID) => {
  const currentDateStr = moment().format("YYYY-MM-DD");
  const firstDay = moment(currentDateStr) //<------ dateToShow
    .startOf("month")
    .format("");
  const lastDay = moment(currentDateStr) //<------ dateToShow
    .endOf("month")
    .format("");
  const date = {
    startdate: firstDay,
    enddate: lastDay,
  };
  // const employeeID = this.props.employee._id;
  // const projectID = this.props.employee.projectID;

  const payload = {
    date,
    employeeID,
    projectID,
  };
  return payload;
};

// Function to sort this.props.jobDays
const sortArrAsc = (arr) => {
  let date;
  let upObj = {};
  let newArr = [];
  let sortedArr;
  arr.map((day) => {
    date = new Date(day.date);
    upObj = { ...day, date };
    newArr.push(upObj);
  });
  sortedArr = newArr.slice().sort((a, b) => a.date - b.date);
  return sortedArr;
};
const sortArrDesc = (arr) => {
  let date;
  let upObj = {};
  let newArr = [];
  let sortedArr;
  arr.map((day) => {
    date = new Date(day.date);
    upObj = { ...day, date };
    newArr.push(upObj);
  });
  sortedArr = newArr.slice().sort((a, b) => b.date - a.date);
  return sortedArr;
};

class Jobday extends Component {
  state = {
    messages: {},
    loading: false,
    workDays: null,
    selectedDay: null,
    date: null,
    showDay: false,
    //Order how to show Month list
    ascendOrder: true,
    descendOrder: false,
    //Show Single Day in Edit Mode( for Manager)
    isEditMode: false,
    //if jobday has manager note. split single day bodu in two colomns
    isManagerNoteExists: false,
  };

  //Load Current Month on Mount
  componentDidMount() {
    this.props.selectMonth(
      getMonth(this.props.employee._id, this.props.employee.projectID)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        selectedDay: this.props.selectedDay,
        loading: this.props.loading,
        date: this.props.date,

        showDay: this.props.showDay,
        // workDays: sort(this.props.workDays),
      });

      //if Jobday has mnager note split single day in two colomns
      if (this.props.selectedDay) {
        if (this.props.selectedDay.managerNote) {
          this.setState({ isManagerNoteExists: true });
        } else {
          this.setState({ isManagerNoteExists: false });
        }
      }
    }
    if (prevProps.workDays !== this.props.workDays) {
      if (this.props.workDays) {
        this.setState({
          workDays: this.state.descendOrder
            ? sortArrDesc(this.props.workDays)
            : sortArrAsc(this.props.workDays),
        });
      }
    }
    //If State changer ascendOrder descendOrder
    if (prevState.descendOrder !== this.state.descendOrder) {
      this.setState({
        workDays: this.state.descendOrder
          ? sortArrDesc(this.props.workDays)
          : sortArrAsc(this.props.workDays),
      });
    }
    //Messages
    if (prevProps.message !== this.props.message) {
      if (this.props.message) {
        this.setState({
          selectedDay: true,
        });
      }
    }
    //reload month after create day finished
    if (this.props.jobDayCreated !== prevProps.jobDayCreated) {
      this.props.selectMonth(
        getMonth(this.props.employee._id, this.props.employee.projectID)
      );
    }
  }

  _managerConfirm = () => {
    //Create payload
    const payload = {
      selectedDay: this.state.selectedDay,
      hoursLimit: this.props.hoursLimit,
    };

    this.props.managerConfirm(payload);
  };

  _cancelManConfirm = () => {
    //Create payload
    const payload = {
      selectedDay: this.state.selectedDay,
      hoursLimit: this.props.hoursLimit,
    };
    this.props.managerCancelConfirm(payload);
    //Select Day
    const payloadDay = {
      date: moment(this.state.selectedDay.date).format("YYYY-MM-DD"),
      employeeID: this.state.selectedDay.employee,
      projectID: this.state.selectedDay.projectID,
    };

    this.props.selectDay(payloadDay);
  };
  //Use selectDay
  //View Selected day
  _viewEmp = (e) => {
    this.props.showDayChild(true);
    console.log("e", e);
    const payload = {
      date: moment(e.date).format("YYYY-MM-DD"),
      employeeID: e.employee,
      projectID: e.projectID,
    };
    console.log("payload", payload);
    this.props.selectDay(payload);
  };
  _cancelShowDay = () => {
    this.props.showDayChild(false);
    //relode current month
    this.props.selectMonth(
      getMonth(this.props.employee._id, this.props.employee.projectID)
    );
  };
  _editModeOn = () => {
    this.setState({ isEditMode: true });
  };

  render() {
    if (this.state.loading || this.state.selectedDay === null) {
      return (
        //Spinner
        <div className="my-5">
          <DotLoaderSpinner />
        </div>
      );
    } else if (this.state.message) {
      return (
        //Message
        <div className="my-2 text-center ">
          <span className="text-white">
            {moment(this.state.date).format("LL") +
              " " +
              moment(this.state.date).format("dddd")}
          </span>
          <br />
          <br />
          {/* <span className="text-white">{this.state.message.message}</span>
          <span className="text-white">{this.state.message.messageDelete}</span> */}
        </div>
      );
    } else if (this.state.workDays && !this.state.showDay) {
      return (
        //Here Whole Month
        <Scrollbar
          style={{ width: "100%", height: 350, backgroundColor: "#2e6585" }}
        >
          <div className="my-3  ">
            <table className="table ">
              <thead style={{ borderBottom: "none" }}>
                <tr>
                  <th
                    scope="col"
                    style={{ borderBottom: "none", borderTop: "none" }}
                  >
                    <span className="text-white">Date</span>
                    {/* {Show List of days Ascend order  or Descend order} */}
                    {this.state.ascendOrder ? (
                      <button
                        className="ml-4 btn btn-sm border rounded"
                        onClick={() =>
                          this.setState({
                            descendOrder: true,
                            ascendOrder: false,
                          })
                        }
                      >
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ color: "#fff" }}
                        />
                      </button>
                    ) : (
                      <button
                        className="ml-4 btn btn-sm border rounded"
                        onClick={() =>
                          this.setState({
                            descendOrder: false,
                            ascendOrder: true,
                          })
                        }
                      >
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ color: "#fff" }}
                        />
                      </button>
                    )}
                  </th>
                  <th
                    scope="col"
                    style={{
                      borderBottom: "none",
                      borderTop: "none",
                    }}
                  >
                    <span className="text-white">Start</span>
                  </th>
                  <th
                    scope="col"
                    style={{ borderBottom: "none", borderTop: "none" }}
                  >
                    <span className="text-white">End</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.state.workDays.map((day, i) => (
                  <tr key={i} style={{ backgroundColor: "#bdc6c7" }}>
                    {/* {Date} */}
                    <td
                      className="d-flex justify-content-between "
                      style={{ borderBottom: "none", width: "80%" }}
                    >
                      <span className="font-weight-bold text-white">
                        {moment(day.date).format("L ")}
                      </span>
                      <span className="font-weight-bold  text-white ">
                        {moment(day.date).format("ddd")}
                      </span>
                    </td>
                    {/* {Start} */}
                    <td>
                      {day.timeStart ? (
                        <span
                          className={classnames("text-success", {
                            "text-danger":
                              moment(day.timeStart).format("HH:mm") >
                              this.props.hoursLimit.startHour,
                          })}
                        >
                          {moment(day.timeStart).format("HH:mm")}
                          {day.timeStartMan ? (
                            <span className="text-danger ml-2">!</span>
                          ) : null}
                        </span>
                      ) : (
                        <span>Pending..</span>
                      )}
                    </td>

                    {/* {End} */}

                    <td>
                      {day.timeEnd ? (
                        <span
                          className={classnames("text-success", {
                            "text-danger":
                              moment(day.timeEnd).format("HH:mm") <
                              this.props.hoursLimit.endHour,
                          })}
                        >
                          {moment(day.timeEnd).format("HH:mm")}
                          {day.timeEndMan ? (
                            <span className="text-danger ml-2">!</span>
                          ) : null}
                        </span>
                      ) : (
                        <span className="text-white"> Pending..</span>
                      )}
                    </td>
                    {/* {Checked} */}
                    <td>
                      <ToolTip
                        text={
                          day.confirmEmployee ? (
                            <div>
                              {day.confirmManager ? (
                                <span className="text-success">
                                  <FontAwesomeIcon icon={faCheckDouble} />
                                </span>
                              ) : (
                                <span className="text-success">
                                  <FontAwesomeIcon icon={faCheck} />
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-danger">
                              {" "}
                              <FontAwesomeIcon icon={faExclamationCircle} />
                            </span>
                          )
                        }
                        tip={
                          day.confirmEmployee
                            ? "Employee has confirmed the hours pair"
                            : "Pending confirmation.."
                        }
                      />
                    </td>
                    <td style={{ paddingRight: 0, paddingLeft: 0 }}>
                      <ToolTip
                        text={
                          day.startedByManager && (
                            <FontAwesomeIcon icon={faFlag} color="#0c67f0" />
                          )
                        }
                        tip="Jobday created by Manager"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={this._viewEmp.bind(this, day)}
                      >
                        <span className="text-white">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Scrollbar>
      );
    } else if (this.state.isEditMode) {
      return (
        <JobdayEditManager
          message={this.state.selectedDay.message}
          date={this.state.selectedDay.date}
          timeStart={this.state.selectedDay.timeStart}
          timeEnd={this.state.selectedDay.timeEnd}
          timeEndMan={this.state.selectedDay.timeEndMan}
          timeStartMan={this.state.selectedDay.timeStartMan}
          endHour={this.props.hoursLimit.endHour}
          startHour={this.props.hoursLimit.startHour}
          confirmEmployee={this.state.selectedDay.confirmEmployee}
          cancelEditModeChild={(state) => this.setState({ isEditMode: state })}
          managerNote={this.state.selectedDay.managerNote}
          startedByManager={this.state.selectedDay.startedByManager}
        />
      );
    } else {
      return (
        //Show Single day
        <div className="my-3 border">
          <div
            className="row   border mx-auto pb-2 bg-dark"
            style={{ width: "100%" }}
          >
            <div className="col-md-8  ">
              <div className="my-2 ml-5 mt-3">
                <span className="text-white " style={{ fontWeight: "bold" }}>
                  {moment(this.state.selectedDay.date).format("LL") +
                    " " +
                    moment(this.state.selectedDay.date).format("dddd")}
                </span>
              </div>
            </div>
            {/* Button To Close Single Day */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary mt-2 "
                onClick={this._cancelShowDay}
              >
                X
              </button>
            </div>
            {/* Edit Single Jobday by Manager */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary mt-2 "
                onClick={this._editModeOn}
              >
                Edit
              </button>
            </div>
          </div>
          {/* Body of Jobday */}
          <div className={this.state.isManagerNoteExists ? "row" : ""}>
            <div className={this.state.isManagerNoteExists ? "col-md-6" : ""}>
              <div className="  p-3 " style={{ backgroundColor: "#bdc6c7" }}>
                <span
                  className="ml-4"
                  style={{ fontWeight: "bold", color: "#FFF" }}
                >
                  {" "}
                  Start Time
                </span>
                <span
                  className={classnames("text-success ", {
                    "text-danger ":
                      moment(this.state.selectedDay.timeStart).format("hh:mm") >
                      this.props.hoursLimit.startHour,
                  })}
                  style={{ fontWeight: "bold", marginLeft: 40 }}
                >
                  {moment(this.state.selectedDay.timeStart).format("hh:mm")}
                </span>
                <br />
                {this.state.selectedDay.timeStartMan ? (
                  <div className="bg-danger mt-1 p-2 ">
                    <span className="text-white">
                      Added manually on{" "}
                      {moment(this.state.selectedDay.timeStartMan).format(
                        "LLL"
                      )}
                    </span>
                  </div>
                ) : null}
                <hr />
                <span
                  className="ml-4"
                  style={{ fontWeight: "bold", color: "#FFF" }}
                >
                  {" "}
                  End Time
                </span>
                {this.state.selectedDay.timeEnd ? (
                  <span
                    className={classnames("text-success ml-5", {
                      "text-danger ml-5":
                        moment(this.state.selectedDay.timeEnd).format("HH:mm") <
                        this.props.hoursLimit.endHour,
                    })}
                    style={{ fontWeight: "bold" }}
                  >
                    {moment(this.state.selectedDay.timeEnd).format("HH:mm")}
                  </span>
                ) : null}
                <br />
                {this.state.selectedDay.timeEndMan ? (
                  <div className="bg-danger mt-1 p-2 ">
                    <span className="text-white">
                      Added manually on{" "}
                      {moment(this.state.selectedDay.timeEndMan).format("LLL")}
                    </span>
                  </div>
                ) : null}
                <hr />
                {/* {Message from Employee} */}
                {this.state.selectedDay.messages.length > 0 ? (
                  <div className="rounded p-2 mb-4 bg-dark">
                    <div className="text-center h6 ">
                      <span className="text-white">Messages from Employee</span>
                    </div>
                    {this.state.selectedDay.messages.map((message, i) => (
                      <div className="border my-1 p-2" key={i}>
                        <span style={{ color: "#e5fa05" }}>
                          {" "}
                          [{moment(message.date).format("HH:mm")}]:
                        </span>{" "}
                        <span style={{ color: "#FFF" }}> {message.text}</span>
                      </div>
                    ))}

                    <div className="py-2"></div>
                  </div>
                ) : null}
                {/* {Here Manager can confirm if Employee Confirmed hours pair} */}

                {
                  //If creted by manager
                  this.state.selectedDay.startedByManager ? (
                    <span className="text-info">Created By Manager</span>
                  ) : (
                    <div className="my-3 pl-4">
                      {this.state.selectedDay.confirmEmployee ? (
                        <div className="my-3 pl-4">
                          {this.state.selectedDay.confirmManager ? (
                            <div>
                              <span className="text-success">
                                Confirmed by Manager{" "}
                                <FontAwesomeIcon icon={faCheckDouble} />
                              </span>{" "}
                              <input
                                type="button"
                                value="Cancel"
                                className="btn btn-outline-secondary ml-4"
                                onClick={this._cancelManConfirm}
                              />
                            </div>
                          ) : (
                            <div>
                              <span className="text-success">
                                Employee Confirmed hours{" "}
                                <FontAwesomeIcon icon={faCheck} />
                              </span>{" "}
                              <input
                                type="button"
                                value="Confirm"
                                className="btn btn-outline-success"
                                onClick={this._managerConfirm}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-danger">
                          Pending of Employee confirmation..
                        </span>
                      )}
                    </div>
                  )
                }
              </div>
            </div>
            <div
              className={this.state.isManagerNoteExists ? "col-md-6 " : ""}
              style={{
                backgroundColor: "#bdc6c7",
                // width: "100%",
                marginLeft: -14,
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              {this.state.isManagerNoteExists && (
                <div className=" border">
                  <div className="bg-dark py-1">
                    <div className="text-center text-white">Manager Note</div>
                  </div>
                  <div className="px-2 pt-2">
                    <span>{this.state.selectedDay.managerNote}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

//PropsTypes

Jobday.propsTypes = {
  date: PropTypes.string, //if selected day exists -> date=null
  employee: PropTypes.object,
  hoursLimit: PropTypes.object,
  loading: PropTypes.bool,
  managerCancelConfirm: PropTypes.func,
  selectDay: PropTypes.func,
  selectMonthy: PropTypes.func,
  managerConfirm: PropTypes.func,
  showControls: PropTypes.func,
  message: PropTypes.string,
  showDay: PropTypes.bool,
  showDayChild: PropTypes.obj,
  workDays: PropTypes.array,
};

const mapStateToProps = (state) => ({
  message: state.jobday.message,
  selectedDay: state.jobday.selectedDay,
  loading: state.jobday.loading,
  workDays: state.jobday.workDays,
  date: state.jobday.date,
  hoursLimit: state.jobday.hoursLimit,
});

export default connect(mapStateToProps, {
  managerConfirm,
  managerCancelConfirm,
  selectMonth,
  selectDay,
})(Jobday);
