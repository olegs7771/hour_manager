import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
  managerEditHours,
  selectDay,
  deleteJobdayByID,
} from "../../../store/actions/jobdayAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import Popup from "../popup/Popup";

//Function to test input field
const testInput = (value) => {
  console.log("value", value);

  const reg = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return reg.test(value);
};

class JobdayEditManager extends Component {
  state = {
    timeStart: "",
    timeEnd: "",
    errors: {},
    //if the manager decides to leave a note in Edit Jobday
    // split jobday container in two colomns
    isManagerNoteOpen: false,
    text: "",
    isPopupOpen: false,
  };

  componentDidMount() {
    this.setState({
      timeStart: moment(this.props.timeStart).format("HH:mm"),
      timeEnd: this.props.timeEnd
        ? moment(this.props.timeEnd).format("HH:mm")
        : null,
    });
    //split jobday body if selectedDay has managerNote
    // if (this.props.selectedDay.managerNote) {
    //   this.setState({
    //     isManagerNoteOpen: true,
    //     text: this.props.selectedDay.managerNote,
    //   });
    // }
  }

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
      managerComment: this.state.text,
    };
    this.props.managerEditHours(data);
    // Reload Select Day after Manager had editted hour to gat selectedDay into the Redux.
    const payload = {
      date: moment(this.props.selectedDay.date).format("YYYY-MM-DD"),
      employeeID: this.props.selectedDay.employee,
      projectID: this.props.selectedDay.projectID,
    };
    this.props.selectDay(payload);
  };

  componentWillUnmount() {
    this.setState({
      timeStart: "",
      timeEnd: "",
    });
  }
  //Popover
  _changeBtn = (state) => {
    this.setState({ isPopupOpen: state });
  };
  //Delete Current Jobday by ID
  _deleteJobday = () => {
    this.props.deleteJobdayByID({ id: this.props.selectedDay._id });
  };

  render() {
    if (this.props.selectedDay) {
      return (
        //Show Single day
        // Header
        <div className="my-3 border">
          <div
            className="row   border mx-auto pb-2 bg-dark"
            style={{ width: "100%" }}
          >
            <div className="col-md-5 ">
              <div className="my-2 ml-5 mt-3">
                <span className="text-white " style={{ fontWeight: "bold" }}>
                  {moment(this.props.date).format("LL") +
                    " " +
                    moment(this.props.date).format("dddd")}
                </span>
              </div>
            </div>
            {/* Button To Submit changes */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary mt-2 "
                onClick={this._submit}
              >
                Submit
              </button>
            </div>
            <div className="col-md-2">
              <Popup
                // open={this.state.open}

                icon={this.state.isPopupOpen ? "Cancel" : "Delete"}
                marginTop={8}
                btnText="#fff"
                backgroundColor="#5d6316"
                title={<span className="text-danger  ">Delete Warning</span>}
                placement={"top"}
                //toggle Button Delete Profile/Cancel
                open={this._changeBtn} //state from Popover
                body={
                  <div className=" p3">
                    Are you sure to delete current Jobday?
                    <div className="btn-group my-3">
                      <button onClick={this._deleteJobday}>Yes</button>
                    </div>
                  </div>
                }
              />

              {/* <button
                className="btn btn-outline-warning mt-2 "
                onClick={this._submit}
              >
                Delete
              </button> */}
            </div>
            {/* Comments Manager */}
            <div className="col-md-1">
              <button
                className="btn btn-outline-secondary mt-2 "
                onClick={() =>
                  this.setState({
                    isManagerNoteOpen: !this.state.isManagerNoteOpen,
                  })
                }
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>

            {/* Cancel Edit Jobday by Manager */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary mt-2 ml-1 "
                onClick={this._cancelEdit}
              >
                X
              </button>
            </div>
          </div>
          {/* Body of EditJobday */}
          <div className={this.state.isManagerNoteOpen ? "row" : ""}>
            <div className={this.state.isManagerNoteOpen ? "col-md-6" : ""}>
              <div className="  p-3  " style={{ backgroundColor: "#bdc6c7" }}>
                <span
                  className="ml-4"
                  style={{ fontWeight: "bold", color: "#FFF" }}
                >
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
                    marginLeft: 25,
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
                <span
                  className="ml-4"
                  style={{ fontWeight: "bold", color: "#FFF" }}
                >
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
                      Added manually on{" "}
                      {moment(this.props.timeEndMan).format("LLL")}
                    </span>
                  </div>
                ) : null}
                <hr />
                {/* {Here Manager can confirm if Employee Confirmed hours pair} */}
                {/* if confirmed by manager */}
                {this.props.startedByManager ? (
                  <span className="ml-3 text-info">Created By Manager</span>
                ) : (
                  <div>
                    {this.props.confirmEmployee ? (
                      <div className="my-3 pl-4">
                        {this.props.selectedDay.confirmManager ? (
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
                )}
              </div>
            </div>
            {this.state.isManagerNoteOpen && (
              <div
                className="col-md-6"
                style={{
                  marginLeft: -15,
                  backgroundColor: "#bdc6c7",
                  paddingTop: 10,
                }}
              >
                <textarea
                  value={this.state.text}
                  onChange={this._onChange}
                  name="text"
                  rows={5}
                  style={{ width: "100%" }}
                  placeholder="Add comment.."
                />
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="my-5">
          <DotLoaderSpinner />
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  selectedDay: state.jobday.selectedDay,
  loading: state.jobday.loading,
  message: state.jobday.message,
});

export default connect(mapStateToProps, {
  managerEditHours,
  selectDay,
  deleteJobdayByID,
})(JobdayEditManager);
