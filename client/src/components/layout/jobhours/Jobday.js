import React, { Component } from "react";
import { connect } from "react-redux";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { isEmpty } from "../../../utils/isEmpty";
import moment from "moment";

export class Jobday extends Component {
  state = {
    loading: false,
    selectedDay: null,
    messages: {},
    showPanel: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading, showPanel: true });
    }
    if (prevProps.selectedDay !== this.props.selectedDay) {
      this.setState({ selectedDay: this.props.selectedDay, messages: {} });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: this.props.messages,
        loading: false,
        selectedDay: true
      });
    }
  }

  render() {
    if (this.state.showPanel) {
      if (this.state.loading || this.state.selectedDay === null) {
        return (
          <div className="border" style={{ paddingTop: "30%" }}>
            <DotLoaderSpinner />
          </div>
        );
      } else if (isEmpty(this.state.messages)) {
        return (
          <div className=" border my-3">
            <div className="my-1 text-center">
              Date : {moment(this.state.selectedDay.date).format("LL")}
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Started</th>
                  <th scope="col">Ended</th>
                  <th scope="col">Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.selectedDay.timeStart}</td>
                  <td>{this.state.selectedDay.timeEnd}</td>
                  <td>some comments</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <div className="my-3">
            <div className="d-flex justify-content-center">
              <span className="">
                Date : {moment(this.state.selectedDay.date).format("LL")}
              </span>
            </div>

            <div className="my-4 border text-success text-center">
              <div className="my-1 text-center"></div>
              {this.state.messages.message}
            </div>
          </div>
        );
      }
    } else {
      return <div className="my-1">{null}</div>;
    }
  }
}

const mapStateToProps = state => ({
  messages: state.jobday.messages,
  loading: state.jobday.loading,
  selectedDay: state.jobday.selectedDay
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Jobday);
