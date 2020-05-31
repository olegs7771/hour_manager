//This Child Component of EmployeeDeytail.js
// In this component we will  show  the total amount of hours
// Employee had spent timeStart to timeEnd

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

//Function To Sum Up total hours
const totalSum = (arr) => {
  const reducer = (acc, currValue) => acc + currValue;
  return arr.reduce(reducer) / 3600;
};

const total = (daysArr) => {
  let end;
  let start;
  let totalTime = [];
  let total;
  daysArr.map((day) => {
    end = moment(day.timeEnd).format("X");
    start = moment(day.timeStart).format("X");
    totalTime.push(end - start);
  });

  const totalStr = totalSum(totalTime).toString();
  total = totalStr.slice(0, 5);
  return total;
};

class TotalJobHours extends Component {
  state = {
    workDays: null,
    showTotal: false,
    total: null,
  };
  componentDidMount() {
    this.setState({ showTotal: this.props.message ? false : true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.workDays !== this.props.workDays) {
      this.setState({ workDays: this.props.workDays });
    }
    if (prevProps.message !== this.props.message) {
      this.setState({ showTotal: this.props.message ? false : true });
    }
    if (this.state.workDays !== prevState.workDays) {
      this.setState({ total: total(this.state.workDays) });
    }
  }

  render() {
    if (this.state.showTotal) {
      return (
        <div className=" my-3 p-1">
          <p className="text-left text-white">
            The total amount of work hours for current month based on the data
            in the data base.
          </p>
          <span style={{ fontWeight: "bold", marginLeft: 10, color: "#FFF" }}>
            Total Hours
          </span>{" "}
          <span style={{ color: "#ebde34", fontWeight: "bold" }}>
            {this.state.total}
          </span>{" "}
          <span className="text-white">Hours</span>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  workDays: state.jobday.workDays,
  message: state.jobday.message,
});

export default connect(mapStateToProps)(TotalJobHours);

TotalJobHours.propsTypes = {
  workDays: PropTypes.array,
  message: PropTypes.string,
};
