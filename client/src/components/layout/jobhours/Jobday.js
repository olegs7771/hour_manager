import React, { Component } from "react";
import { connect } from "react-redux";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import moment from "moment";

class Jobday extends Component {
  state = {
    messages: {},
    loading: false,
    workDays: null,
    selectedDay: null,
    showComponent: false,
    date: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        showComponent: true,
        selectedDay: this.props.selectedDay,
        loading: this.props.loading,
        date: this.props.date,
        message: this.props.message,
        workDays: this.props.workDays
      });
      if (this.props.message) {
        this.setState({
          selectedDay: true
        });
      }
    }
  }

  render() {
    if (this.state.showComponent) {
      if (this.state.loading || this.state.selectedDay === null) {
        return (
          <div className="my-5">
            <DotLoaderSpinner />
          </div>
        );
      } else if (this.state.message) {
        return (
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
      } else if (this.state.workDays) {
        //Here Whole Month

        return (
          <div className="my-3 border ">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Start</th>
                  <th scope="col">End</th>
                </tr>
              </thead>

              <tbody>
                {this.state.workDays.map((day, i) => (
                  <tr key={i}>
                    <td>{day.date}</td>
                    <td>{day.timeStart}</td>
                    <td>{day.timeEnd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <div className="my-3 ">
            <div className="my-2 text-center">
              {moment(this.state.selectedDay.date).format("LL") +
                " " +
                moment(this.state.selectedDay.date).format("dddd")}
            </div>
            <div className="my-2 border p-3">
              Start : {this.state.selectedDay.timeStart}
              <hr />
              End : {this.state.selectedDay.timeEnd}
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  message: state.jobday.message,
  selectedDay: state.jobday.selectedDay,
  loading: state.jobday.loading,
  workDays: state.jobday.workDays,
  date: state.jobday.date
});

export default connect(mapStateToProps, {})(Jobday);
