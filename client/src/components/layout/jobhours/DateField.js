import React, { Component } from "react";
import "./Date.css";
import moment from "moment";

const yearCheck = (value) => {
  const reg = /^\d{4}$/;
  return reg.test(value);
};
// const monthCheck = (value) => {
//   const reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
//   return reg.test(value);
// };
// const dayCheck = (value) => {
//   const reg = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
//   return reg.test(value);
// };

class DateField extends Component {
  state = {
    year: moment().format("YYYY"),
    month: "",
    day: "",
    isYearFocused: false,
    isMonthFocused: false,
    isDayFocused: false,
    errors: {},
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
    });
  };

  render() {
    return (
      <div className="col-md-6 ">
        <input
          placeholder="MM"
          type="text"
          value={this.state.month}
          onChange={this._onChange}
          name="month"
          onMouseLeave={() => this.setState({ isMonthFocused: false })}
          onMouseEnter={() => this.setState({ isMonthFocused: true })}
          className="text-center no-outline"
          style={{
            width: 40,
            borderTopStyle: "hidden",
            borderLeftStyle: "hidden",
            borderRightStyle: "hidden",
            borderBottomColor: this.state.isMonthFocused
              ? "#425675"
              : "transparent",
          }}
        />
        /
        <input
          placeholder="DD"
          type="text"
          value={this.state.day}
          onChange={this._onChange}
          name="day"
          onMouseEnter={() => this.setState({ isDayFocused: true })}
          onMouseLeave={() => this.setState({ isDayFocused: false })}
          className="text-center no-outline"
          style={{
            width: 40,
            borderTopStyle: "hidden",
            borderLeftStyle: "hidden",
            borderRightStyle: "hidden",
            borderBottomColor: this.state.isDayFocused
              ? "#425675"
              : "transparent",
          }}
        />
        /
        <input
          placeholder="YYYY"
          type="text"
          value={this.state.year}
          onChange={this._onChange}
          name="year"
          onMouseEnter={() => this.setState({ isYearFocused: true })}
          onMouseLeave={() =>
            this.setState({
              isYearFocused: false,
              errors: !yearCheck(this.state.year)
                ? {
                    year: "Wrong Format",
                  }
                : {},
            })
          }
          className="text-center no-outline"
          style={{
            width: 40,
            borderTopStyle: "hidden",
            borderLeftStyle: "hidden",
            borderRightStyle: "hidden",
            borderBottomColor: this.state.isYearFocused
              ? "#425675"
              : this.state.errors.year
              ? "red"
              : "transparent",
            color: this.state.errors.year ? "red" : "",
          }}
        />
        {this.state.errors.year && (
          <div className="small text-danger">{this.state.errors.year}</div>
        )}
      </div>
    );
  }
}

export default DateField;
