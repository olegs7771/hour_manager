import React, { Component } from "react";
import { connect } from "react-redux";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import moment from "moment";
import classnames from "classnames";

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
      } else if (this.state.workDays) {
        return (
          //Here Whole Month
          <div className="my-3  ">
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
                    <td>
                      {moment(day.date).format("MMM Do ") +
                        " " +
                        moment(day.date).format("dddd")}
                    </td>
                    {/* {Start} */}
                    <td>
                      <span
                        className={classnames("text-success", {
                          "text-danger":
                            moment(day.timeStart).format("HH:mm") >
                            this.props.hoursLimit.startHour
                        })}
                      >
                        {moment(day.timeStart).format("HH:mm")}
                      </span>
                    </td>

                    {/* {End} */}

                    <td>
                      <span
                        className={classnames("text-success", {
                          "text-danger":
                            moment(day.timeEnd).format("HH:mm") <
                            this.props.hoursLimit.endHour
                        })}
                      >
                        {moment(day.timeEnd).format("HH:mm")}
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
              Start
              <span className="ml-5 ">
                {moment(this.state.selectedDay.timeStart).format("hh : mm")}
              </span>
              <hr />
              End
              <span className="ml-5">
                {moment(this.state.selectedDay.timeEnd).format("hh : mm")}
              </span>
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
  date: state.jobday.date,
  hoursLimit: state.jobday.hoursLimit
});

export default connect(mapStateToProps, {})(Jobday);
