//This Component has controls for EmployeeDetail.js
//two radio inputs (single day ,month view)
//Create new Jobday by manager
//Delete jobday by manager

import React, { Component } from "react";
class EmployeeControls extends Component {
  state = {
    showDay: false,
    showMonth: false,
    isShowCreateDay: false,
    //We pick the date on Calendar
    pickDate: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const data = {
        showDay: this.state.showDay,
        showMonth: this.state.showMonth,
      };
      this.props.parentCB(data);
      this.props.showCreateJobday(this.state.isShowCreateDay);
    }
    //Pick Date on Calendar
    if (prevState.isShowCreateDay !== this.state.isShowCreateDay) {
      if (this.state.isShowCreateDay) {
        this.props.pickDate(true);
      } else {
        this.props.pickDate(false);
      }
    }
  }

  _onSubmit = () => {
    console.log("submitted");
  };

  _onChangeDay = (e) => {
    console.log("e.target.checked", e.target.checked);
    this.setState({
      showDay: e.target.name === "day" ? e.target.checked : true,
      showMonth: this.state.showMonth ? false : this.state.showMonth,
    });
  };
  _onChangeMonth = (e) => {
    console.log("e.target.checked", e.target.checked);
    this.setState({
      showMonth: e.target.name === "month" ? e.target.checked : true,
      showDay: this.state.showDay ? false : this.state.showDay,
    });
  };
  _showCreateJobday = () => {
    this.setState({ isShowCreateDay: !this.state.isShowCreateDay });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 ">
            <form onSubmit={this._onSubmit}>
              <div className="row   mx-auto mt-2" style={{ width: "60%" }}>
                <div className="col-md-6  ">
                  <label>
                    <span className="text-white"> Day</span>
                    <input
                      name="day"
                      type="checkbox"
                      checked={this.state.showDay}
                      onChange={this._onChangeDay}
                      className="ml-2"
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label>
                    <span className="text-white"> Month</span>
                    <input
                      name="month"
                      type="checkbox"
                      checked={this.state.showMonth}
                      onChange={this._onChangeMonth}
                      className="ml-2"
                    />
                  </label>
                </div>
              </div>

              <br />
            </form>
          </div>
          <div className="col-md-6 ">
            <div className="row pt-2 justify-content-between px-5">
              <div className="col_md-6 ">
                <input
                  type="button"
                  value={!this.state.isShowCreateDay ? "Create Day" : "Close"}
                  style={{ width: 100 }}
                  className="btn btn-primary"
                  onClick={this._showCreateJobday}
                />
              </div>
              <div className="col_md-6 ">
                <input
                  type="button"
                  value="Delete Day"
                  style={{ width: 100 }}
                  className="btn btn-warning"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeControls;
