import React, { Component } from "react";

class EmployeeControls extends Component {
  state = {
    showDay: false,
    showMonth: false
  };
  _onSubmit = () => {
    console.log("submitted");
  };
  render() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <div className="row  border mx-auto mt-2" style={{ width: "60%" }}>
            <div className="col-md-6  ">
              <label>
                Show Day
                <input
                  name="day"
                  type="checkbox"
                  checked={this.state.showDay}
                  onChange={this.handleInputChange}
                  className="ml-2"
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Show Month
                <input
                  name="month"
                  type="checkbox"
                  checked={this.state.showMonth}
                  onChange={this.handleInputChange}
                  className="ml-2"
                />
              </label>
            </div>
          </div>

          <br />
        </form>
      </div>
    );
  }
}

export default EmployeeControls;
