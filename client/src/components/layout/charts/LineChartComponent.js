import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";

export class LineChartComponent extends Component {
  render() {
    const data = [
      {
        day: "SUN",
        // out: 158336867600,
        in: 1583046902000
      },
      {
        day: "MON",
        // out: 158336867600,
        in: 1583126902000
      },
      {
        day: "TUE",
        // out: 158336867600,
        in: 1583226902000
      },
      {
        day: "WED",
        // out: 158336867600,
        in: 1583565902000
      },
      {
        day: "THU",
        // out: 158336867600,
        in: 1583565902000
      },
      {
        day: "FRY",
        // out: 158336867600,
        in: 1583565902000
      },
      {
        day: "SAT",
        // out: 158336867600,
        in: 1583565902000
      }
    ];
    return (
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis
          domain={["dataMin ", "dataMax"]}
          tickFormatter={unixTime => moment(unixTime).format("HH:mm")}
          type="number"
        />
        <Tooltip formatter={unixTime => moment(unixTime).format("HH:mm LL")} />
        <Legend />
        <Line
          type="monotone"
          dataKey="in"
          stroke="#8884d8"
          legendType="square"
          strokeWidth={2}
        />
        {/* <Line
          type="monotone"
          dataKey="out"
          stroke="#747980"
          legendType="square"
          strokeWidth={2}
        /> */}
        <LabelList dataKey="name" position="insideTop" angle="45" />
      </LineChart>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LineChartComponent);
