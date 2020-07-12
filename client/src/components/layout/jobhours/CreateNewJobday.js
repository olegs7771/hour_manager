import React, { Component } from "react";
import { connect } from "react-redux";
import { managerCreatesJobday } from "../../../store/actions/jobdayAction";

const timeCheck = (value) => {
  const reg = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
  return reg.test(value);
};

class CreateNewJobday extends Component {
  state = {
    errors: {},
    message: null,
    date: null,
    timeStart: "",
    timeEnd: "",
    text: "",
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.date !== prevProps.date) {
      if (this.props.date) {
        this.setState({ date: this.props.date });
        //Test if date exists
      }
    }
    if (prevState.date !== this.state.date) {
      if (this.state.date) {
        const payload = {
          employeeID: this.props.selectedEmployeeDetails._id,
          projectID: this.props.selectedEmployeeDetails.projectID,
          date: this.state.date,
          timeStart: null,
          timeEnd: null,
          text: null,
        };
        this.props.managerCreatesJobday(payload);
      }
    }

    if (prevProps.errors !== this.props.errors) {
      //Cant use GET_ERRORS in redux.
      this.setState({ message: {}, errors: this.props.errors });
    }

    if (prevProps.message !== this.props.message) {
      this.setState({ errors: {}, message: this.props.message });
    }
    if (this.props.message) {
      if (this.state.message !== prevState.message) {
        if (this.state.message.message === "Date was created") {
          console.log("sent to jobday");
          setTimeout(() => {
            //Close CreateNewJobday
            //Reload month
            this.props.close();
          }, 2000);
        }
      }
    }
  }

  _mouseLeaveStart = () => {
    if (!timeCheck(this.state.timeStart) && this.state.timeStart !== "HH:mm") {
      this.setState({ errors: { timeStart: "Check Time Format HH:mm" } });
    } else {
      this.setState({ errors: {} });
    }
  };
  _mouseLeaveEnd = () => {
    if (!timeCheck(this.state.timeEnd) && this.state.timeEnd !== "HH:mm") {
      this.setState({ errors: { timeEnd: "Check Time Format HH:mm" } });
    } else {
      this.setState({ errors: {} });
    }
  };
  _submitNewJobday = async () => {
    if (!this.state.date) {
      return this.setState({ errors: { date: "Pick a date" } });
    }
    if (!timeCheck(this.state.timeStart)) {
      return this.setState({
        errors: { timeStart: "Check Time Format HH:mm" },
      });
    }
    if (!timeCheck(this.state.timeEnd)) {
      return this.setState({ errors: { timeEnd: "Check Time Format HH:mm" } });
    }

    const payload = {
      employeeID: this.props.selectedEmployeeDetails._id,
      projectID: this.props.selectedEmployeeDetails.projectID,
      managerID: this.props.selectedEmployeeDetails.managerID,
      date: this.state.date,
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
      text: this.state.text,
    };
    console.log("payload to create new jobday", payload);
    this.props.managerCreatesJobday(payload);
  };

  render() {
    return (
      <div className="border px-3">
        <div className="text-center my-2">
          <span className="font-weight-bold text-white">Create Job Day</span>
        </div>
        <div className=" my-2">
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row justify-content-between">
                {/* Date Field */}
                <div className="col-md-6">Date</div>
                {this.state.date ? (
                  <div className="col-md-6">{this.state.date.date}</div>
                ) : (
                  <div className="col-md-6">Pick a date On the Calendar</div>
                )}
              </div>
              {/* Errors Date */}
              {this.state.errors.errorDate && (
                <div className=" text-center">
                  <span className="text-danger">
                    {this.state.errors.errorDate}
                  </span>
                </div>
              )}

              {/* Message Date */}
              {this.state.message && (
                <div className=" text-center">
                  <span className="text-success">
                    {this.state.message.message}
                  </span>
                </div>
              )}
            </li>
            <li className="list-group-item">
              <div className="row justify-content-between">
                <div className="col-md-6">Start Time</div>
                <div className="col-md-6">
                  <input
                    placeholder="HH:mm"
                    type="text"
                    value={this.state.timeStart}
                    onChange={this._onChange}
                    name="timeStart"
                    onMouseLeave={this._mouseLeaveStart}
                    className="text-center"
                  />
                </div>
              </div>
              {this.state.errors.timeStart && (
                <div className=" text-center">
                  <span className="text-danger">
                    {this.state.errors.timeStart}
                  </span>
                </div>
              )}
            </li>
            <li className="list-group-item">
              <div className="row justify-content-between">
                <div className="col-md-6">End Time</div>
                <div className="col-md-6">
                  <input
                    placeholder="HH:mm"
                    type="text"
                    value={this.state.timeEnd}
                    onChange={this._onChange}
                    name="timeEnd"
                    onMouseLeave={this._mouseLeaveEnd}
                    className="text-center"
                  />
                </div>
              </div>
              {this.state.errors.timeEnd && (
                <div className=" text-center">
                  <span className="text-danger">
                    {this.state.errors.timeEnd}
                  </span>
                </div>
              )}
            </li>
            <li className="list-group-item">
              <div className="row justify-content-between">
                <div className="col-md-6">Notes</div>
                <div className="col-md-6">
                  <textarea
                    value={this.state.text}
                    onChange={this._onChange}
                    name="text"
                    rows={2}
                    style={{ width: "100%" }}
                    placeholder="Add comment.."
                  />
                </div>
              </div>
            </li>

            {!Object.keys(this.state.errors).length > 0 && (
              <input
                type="button"
                value="Create"
                className="py-2"
                style={{ backgroundColor: "#3c4a5c", color: "#FFF" }}
                onClick={this._submitNewJobday}
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => ({
  date: state.jobday.date,
  errors: state.errors.errors,
  message: state.jobday.message,
});
export default connect(mapStateToprops, { managerCreatesJobday })(
  CreateNewJobday
);
