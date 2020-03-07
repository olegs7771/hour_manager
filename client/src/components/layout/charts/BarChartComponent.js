import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { connect } from "react-redux";
import moment from "moment";

export class BarChartComponent extends Component {
  render() {
    const data = [
      {
        day: "SUN",

        Oleg: 1583043755000
      },
      {
        day: "MON",

        Oleg: 1583130155000
      },
      {
        day: "TUE",

        Oleg: 1583216555000
      },
      {
        day: "WED",

        Oleg: 1583302955000
      },
      {
        day: "THU",

        Oleg: 1583389355000
      },
      {
        day: "FRY",

        Oleg: 1583479502000
      },
      {
        day: "SAT",

        Oleg: 1583564180000
      }
    ];
    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis
          domain={["auto", "auto"]}
          tickFormatter={unixTime => moment(unixTime).format("HH:mm Do")}
          type="number"
        />
        <Tooltip />
        <Legend />
        {/* <Bar dataKey="John" fill="#8884d8" />
        <Bar dataKey="Marina" fill="#82ca9d" /> */}
        <Bar
          dataKey="Oleg"
          fill="#888400"
          onMouseEnter={this.props.showDate}
          // name={"test"}
        />
      </BarChart>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BarChartComponent);
