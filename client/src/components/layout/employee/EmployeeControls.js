import React, { Component } from "react";

class EmployeeControls extends Component {
  state = {
    showDay: false,
    showMonth: false,
  };
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const data = {
        showDay: this.state.showDay,
        showMonth: this.state.showMonth,
      };
      this.props.parentCB(data);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <div className="row   mx-auto mt-2" style={{ width: "60%" }}>
            <div className="col-md-6  ">
              <label>
                <span className="text-white">Show Day</span>
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
                <span className="text-white">Show Month</span>
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
    );
  }
}

export default EmployeeControls;
