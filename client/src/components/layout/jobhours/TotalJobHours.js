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

class TotalJobHours extends Component {
  state = {
    workDays: null,
    showTotal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.workDays !== this.props.workDays) {
      this.setState({ workDays: this.props.workDays });
    }
    if (prevProps.message !== this.props.message) {
      this.setState({ showTotal: this.props.message ? false : true });
    }
  }

  render() {
    let totalTime = [];
    let total; //total Hours
    let end;
    let start;

    if (this.state.workDays) {
      this.state.workDays.map((day) => {
        end = moment(day.timeEnd).format("X");
        start = moment(day.timeStart).format("X");
        console.log("end", end);
        console.log("start", start);

        totalTime.push(end - start);
      });

      const totalStr = totalSum(totalTime).toString();
      total = totalStr.slice(0, 5);
    }
    console.log("total", total);
    if (this.state.showTotal) {
      return (
        <div className=" my-3 p-1">
          <p className="text-left">
            The total amount of work hours for current month based on the data
            in the data base.
          </p>
          <span style={{ fontWeight: "bold", marginLeft: 10 }}>
            Total Hours
          </span>{" "}
          {total} hours
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
