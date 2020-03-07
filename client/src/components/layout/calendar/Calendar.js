import React from "react";
import tuiCalendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const Calendar = () => {
  const calendar = new tuiCalendar("#calendar", {
    defaultView: "month",
    taskView: true,
    template: {
      monthDayname: function(dayname) {
        return (
          '<span class="calendar-week-dayname-name">' +
          dayname.label +
          "</span>"
        );
      }
    }
  });
  return <div>{calendar}</div>;
};

export default Calendar;
