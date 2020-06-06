import React from "react";
import moment from "moment";
import { uuid } from "uuidv4";
import "./calendar.css";
import { connect } from "react-redux";
import {
  selectDay,
  selectMonth,
  managerPickDate,
} from "../../../store/actions/jobdayAction";

class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    showDay: false,
    showMonth: true,
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  yearIndex = () => {
    return this.state.dateObject.format("YYYY");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };

  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  monthIndex = () => {
    return this.state.dateObject.format("MM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable,
    });
  };
  setMonth = (month) => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable,
    });
  };
  MonthList = (props) => {
    let months = [];
    props.data.map((data, i) => {
      months.push(
        <td
          key={i}
          className="calendar-month"
          onClick={(e) => {
            this.setMonth(data);
          }}
        >
          <span key={props}>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearTable = (e) => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable,
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr),
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr),
    });
  };
  setYear = (year) => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable,
    });
  };
  onYearChange = (e) => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = (props) => {
    let months = [];
    let nextten = moment().set("year", props).add("year", 12).format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Year</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  //Dispatch Action to jobdayAction
  //If We want to pick a date for CreatenewJobday
  //this.props.pickDate:true

  onDayClick = (e, d, m, y) => {
    //fix day if one digit add 0
    // console.log("d", typeof d);
    //conver to string
    const dayStr = d.toString();

    const day = dayStr.length < 2 ? `0${d}` : d;
    const dateToShow = `${y}-${m}-${day}`;
    // console.log("dateToShow", dateToShow);
    //Only pick date for CreateNewJobday.js

    const EmployeeID = this.props.selectedEmployee._id;
    const ProjectID = this.props.selectedEmployee.projectID;

    //Show Month by default but if this.props.showDay===true
    //then show Day

    if (this.props.pickDate) {
      return this.props.managerPickDate({ date: dateToShow });
    } else if (this.props.showDay) {
      this.props.selectDay({
        date: dateToShow,
        employeeID: EmployeeID,
        projectID: ProjectID,
      });
    } else {
      //Create data obj {startdate:dateToShow,enddate:dateToShow }
      //First Day of Month
      const firstDay = moment(dateToShow) //<------ dateToShow
        .startOf("month")
        .format("");
      const lastDay = moment(dateToShow) //<------ dateToShow
        .endOf("month")
        .format("");
      const data = {
        startdate: firstDay,
        enddate: lastDay,
      };

      this.props.selectMonth({
        date: data,
        employeeID: EmployeeID,
        projectID: ProjectID,
      });
    }
  };

  // Render

  render() {
    let weekdayshortname = this.weekdayshort.map((day) => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <td key={i} className="calendar-day empty">
          {""}
        </td>
      );
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";

      daysInMonth.push(
        <td key={uuid()} className={`calendar-day ${currentDay}`}>
          <span
            onClick={(e) => {
              console.log("clicked");

              this.onDayClick(e, d, this.monthIndex(), this.yearIndex());
            }}
          >
            {d}
          </span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <div className="tail-datetime-calendar">
        <div className="calendar-navi">
          <span
            onClick={(e) => {
              this.onPrev();
            }}
            className="calendar-button button-prev"
          />
          {!this.state.showMonthTable && (
            <span
              onClick={(e) => {
                this.showMonth();
              }}
              className="calendar-label"
            >
              {this.month()}
            </span>
          )}
          <span
            className="calendar-label"
            onClick={(e) => this.showYearTable()}
          >
            {this.year()}
          </span>
          <span
            onClick={(e) => {
              this.onNext();
            }}
            className="calendar-button button-next"
          />
        </div>

        <div className="calendar-date">
          {this.state.showYearTable && <this.YearTable props={this.year()} />}
          {this.state.showMonthTable && (
            <this.MonthList data={moment.months()} />
          )}
        </div>

        {this.state.showDateTable && (
          <div className="calendar-date">
            <table className="calendar-day">
              <thead>
                <tr>{weekdayshortname}</tr>
              </thead>
              <tbody>{daysinmonth}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedEmployee: state.employees.selectedEmployee,
});

export default connect(mapStateToProps, {
  selectDay,
  selectMonth,
  managerPickDate,
})(Calendar);
