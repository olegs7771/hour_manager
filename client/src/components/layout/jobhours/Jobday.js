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
} from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";

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
  };

  //Load Current Month on Mount
  componentDidMount() {
    //Create payload for Action

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
    const employeeID = this.props.employee._id;
    const projectID = this.props.employee.projectID;

    const payload = {
      date,
      employeeID,
      projectID,
    };
    // console.log("payload to select month", payload);
    this.props.selectMonth(payload);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        selectedDay: this.props.selectedDay,
        loading: this.props.loading,
        date: this.props.date,
        message: this.props.message,
        showDay: this.props.showDay,
        // workDays: sort(this.props.workDays),
      });
      if (this.props.message) {
        this.setState({
          selectedDay: true,
        });
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
  };

  render() {
    console.log("this.props", this.props);

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
          <span className="text-white">{this.state.message}</span>
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
                  <th scope="col" style={{ borderBottom: "none" }}>
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
                  <th scope="col" style={{ borderBottom: "none" }}>
                    <span className="text-white">Start</span>
                  </th>
                  <th scope="col" style={{ borderBottom: "none" }}>
                    <span className="text-white">End</span>
                  </th>
                  <th scope="col" style={{ borderBottom: "none" }}>
                    <span className="text-white">Checked</span>
                  </th>
                  {/* <th scope="col">
                  <span className="small">View</span>
                </th> */}
                </tr>
              </thead>

              <tbody>
                {this.state.workDays.map((day, i) => (
                  <tr key={i}>
                    {/* {Date} */}
                    <td
                      className="d-flex justify-content-between"
                      style={{ borderBottom: "none" }}
                    >
                      <span className="font-weight-bold text-info">
                        {moment(day.date).format("L ")}
                      </span>
                      <span className="font-weight-bold ml-1 text-white">
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
                        <span> Pending..</span>
                      )}
                    </td>
                    <td>
                      <span className="">
                        {day.confirmEmployee ? (
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
                        )}
                      </span>
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
    } else {
      return (
        //Show Single day
        <div className="my-3 border">
          <div
            className="row   border mx-auto pb-2 bg-dark"
            style={{ width: "100%" }}
          >
            <div className="col-md-10  ">
              <div className="my-2 ml-5 mt-3">
                <span className="text-white " style={{ fontWeight: "bold" }}>
                  {moment(this.state.selectedDay.date).format("LL") +
                    " " +
                    moment(this.state.selectedDay.date).format("dddd")}
                </span>
              </div>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary mt-2 "
                onClick={this._cancelShowDay}
              >
                X
              </button>
            </div>
          </div>

          <div className="my-2  p-3">
            <span className="ml-4" style={{ fontWeight: "bold" }}>
              {" "}
              Start Time
            </span>
            <span
              className={classnames("text-success ml-5", {
                "text-danger ml-5":
                  moment(this.state.selectedDay.timeStart).format("hh : mm") >
                  this.props.hoursLimit.startHour,
              })}
              style={{ fontWeight: "bold" }}
            >
              {moment(this.state.selectedDay.timeStart).format("hh : mm")}
            </span>
            <br />
            {this.state.selectedDay.timeStartMan ? (
              <div className="bg-danger mt-1 p-2 ">
                <span className="text-white">
                  Added manually on{" "}
                  {moment(this.state.selectedDay.timeStartMan).format("LLL")}
                </span>
              </div>
            ) : null}
            <hr />
            <span className="ml-4" style={{ fontWeight: "bold" }}>
              {" "}
              End Time
            </span>
            <span
              className={classnames("text-success ml-5", {
                "text-danger ml-5":
                  moment(this.state.selectedDay.timeEnd).format("HH : mm") <
                  this.props.hoursLimit.endHour,
              })}
              style={{ fontWeight: "bold" }}
            >
              {moment(this.state.selectedDay.timeEnd).format("HH : mm")}
            </span>
            <br />
            {this.state.selectedDay.timeEndMan ? (
              <div className="bg-danger mt-1 p-2 ">
                <span className="text-white">
                  Added manually on{" "}
                  {moment(this.state.selectedDay.timeStartMan).format("LLL")}
                </span>
              </div>
            ) : null}
            <hr />
            {/* {Message from Employee} */}
            {this.state.selectedDay.message ? (
              <Message message={this.state.selectedDay.message} />
            ) : null}
            {/* {Here Manager can confirm if Employee Confirmed hours pair} */}
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
              <span>Pending of Employee confirmation</span>
            )}
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
