import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { managerEditHours } from "../../../store/actions/jobdayAction";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faUserMinus,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

//Function to test input field
const testInput = (value) => {
  console.log("value", value);

  const reg = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return reg.test(value);
};

class JobdayEditManager extends Component {
  state = {
    timeStart: moment(this.props.timeStart).format("hh:mm"),
    timeEnd: this.props.timeEnd
      ? moment(this.props.timeEnd).format("hh:mm")
      : null,
    errors: {},
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
    });
  };
  _cancelEdit = () => {
    this.props.cancelEditModeChild(false);
  };

  //Validate onMouseLeave Input
  _validateInputTimeStart = () => {
    if (!testInput(this.state.timeStart)) {
      this.setState({
        errors: {
          timeStart: "Please use HH:mm format e.g 06:00",
        },
      });
    }
  };
  _validateInputTimeEnd = () => {
    if (!testInput(this.state.timeEnd)) {
      this.setState({
        errors: {
          timeEnd: "Please use HH:mm format e.g 06:00",
        },
      });
    }
  };

  _submit = () => {
    const data = {
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
      selectedDay: this.props.selectedDay,
    };
    this.props.managerEditHours(data);
  };
  render() {
    return (
      //Show Single day
      <div className="my-3 border">
        <div
          className="row   border mx-auto pb-2 bg-dark"
          style={{ width: "100%" }}
        >
          <div className="col-md-6  ">
            <div className="my-2 ml-5 mt-3">
              <span className="text-white " style={{ fontWeight: "bold" }}>
                {moment(this.props.date).format("LL") +
                  " " +
                  moment(this.props.date).format("dddd")}
              </span>
            </div>
          </div>
          {/* Button To Submit changes */}

          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary mt-2 "
              onClick={this._submit}
            >
              Submit
            </button>
          </div>
          {/* Edit Single Jobday by Manager */}
          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary mt-2 "
              onClick={this._cancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="  p-3" style={{ backgroundColor: "#bdc6c7" }}>
          <span className="ml-4" style={{ fontWeight: "bold", color: "#FFF" }}>
            {" "}
            Start Time
          </span>{" "}
          <input
            name="timeStart"
            type="text"
            value={this.state.timeStart}
            onChange={this._onChange}
            style={{
              paddingLeft: 10,
              width: 80,
              borderStyle: "none",
              borderRadius: 5,
              marginLeft: 35,
            }}
            onMouseLeave={this._validateInputTimeStart}
          />
          <br />
          {/* Errors  */}
          {this.state.errors.timeStart && (
            <small className="text-danger ml-3">
              {this.state.errors.timeStart}
            </small>
          )}
          <br />
          {this.props.timeStartMan ? (
            <div className="bg-danger mt-1 p-2 ">
              <span className="text-white">
                Added manually on{" "}
                {moment(this.props.timeStartMan).format("LLL")}
              </span>
            </div>
          ) : null}
          <hr />
          <span className="ml-4" style={{ fontWeight: "bold", color: "#FFF" }}>
            End Time
          </span>
          {this.props.timeEnd ? (
            <input
              name="timeEnd"
              type="text"
              value={this.state.timeEnd}
              onChange={this._onChange}
              style={{
                paddingLeft: 10,
                width: 80,
                borderStyle: "none",
                borderRadius: 5,
                marginLeft: 35,
              }}
              onMouseLeave={this._validateInputTimeEnd}
            />
          ) : null}
          <br />
          {/* Errors  */}
          {this.state.errors.timeEnd && (
            <small className="text-danger ml-3">
              {this.state.errors.timeEnd}
            </small>
          )}
          <br />
          {this.props.timeEndMan ? (
            <div className="bg-danger mt-1 p-2 ">
              <span className="text-white">
                Added manually on {moment(this.props.timeEndMan).format("LLL")}
              </span>
            </div>
          ) : null}
          <hr />
          {/* {Message from Employee} */}
          {this.props.message ? <Message message={this.props.message} /> : null}
          {/* {Here Manager can confirm if Employee Confirmed hours pair} */}
          {this.props.confirmEmployee ? (
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
                    Employee Confirmed hours <FontAwesomeIcon icon={faCheck} />
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectedDay: state.jobday.selectedDay,
  loading: state.jobday.loading,
});

export default connect(mapStateToProps, { managerEditHours })(
  JobdayEditManager
);
