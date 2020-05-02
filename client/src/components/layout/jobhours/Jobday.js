import React, { Component } from "react";
import { connect } from "react-redux";
import {
  managerConfirm,
  selectMonth,
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
} from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";

// Function to sort this.props.jobDays
const sortArr = (arr) => {
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

class Jobday extends Component {
  state = {
    messages: {},
    loading: false,
    workDays: null,
    selectedDay: null,

    date: null,
    showDay: false,
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
          workDays: sortArr(this.props.workDays),
        });
      }
    }
  }

  _managerConfirm = () => {
    //Create payload
    const payload = {
      selectedDay: this.state.selectedDay,
      hoursLimit: this.props.hoursLimit.startHour,
    };

    this.props.managerConfirm(payload);
  };

  _cancelManConfirm = () => {
    console.log("cancel confirmation");
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
          <span>
            {moment(this.state.date).format("LL") +
              " " +
              moment(this.state.date).format("dddd")}
          </span>
          <br />
          <br />
          <span>{this.state.message}</span>
        </div>
      );
    } else if (this.state.workDays && !this.state.showDay) {
      return (
        //Here Whole Month
        <div className="my-3  ">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
                <th scope="col">
                  <span className="small">Checked</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {this.state.workDays.map((day, i) => (
                <tr key={i}>
                  {/* {Date} */}
                  <td className="d-flex justify-content-between">
                    <span className="font-weight-bold text-info">
                      {moment(day.date).format("L ")}
                    </span>
                    <span className="font-weight-bold">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        //Show Single day
        <div className="my-3 ">
          <div className="my-2 text-center">
            {moment(this.state.selectedDay.date).format("LL") +
              " " +
              moment(this.state.selectedDay.date).format("dddd")}
          </div>
          <div className="my-2 border p-3">
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
                  Added manually at :{" "}
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
                  Added manually at :{" "}
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
              <div className="my-3 border pl-4">
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

const mapStateToProps = (state) => ({
  message: state.jobday.message,
  selectedDay: state.jobday.selectedDay,
  loading: state.jobday.loading,
  workDays: state.jobday.workDays,
  date: state.jobday.date,
  hoursLimit: state.jobday.hoursLimit,
});

export default connect(mapStateToProps, { managerConfirm, selectMonth })(
  Jobday
);
