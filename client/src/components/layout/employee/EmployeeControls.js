//This Component has controls for EmployeeDetail.js
//two radio inputs (single day ,month view)
//Create new Jobday by manager
//Delete jobday by manager

import React, { Component } from "react";
class EmployeeControls extends Component {
  state = {
    isShowCreateDay: false,
    //We pick the date on Calendar
    pickDate: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
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

  _showCreateJobday = () => {
    this.setState({ isShowCreateDay: !this.state.isShowCreateDay });
  };

  render() {
    return (
      <div>
        <div className=" py-3 px-5">
          <div className="row pt-2 justify-content-between px-5">
            <div className="col_md-12 ">
              <input
                type="button"
                value={!this.state.isShowCreateDay ? "Create Day" : "Close"}
                style={{ width: 100 }}
                className="btn btn-primary"
                onClick={this._showCreateJobday}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeControls;
