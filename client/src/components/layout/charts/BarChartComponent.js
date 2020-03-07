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
        John: 1583523574022,
        Marina: 1583523544022,
        Oleg: 1583523174022
      },
      {
        day: "MON",
        John: 1583523575022,
        Marina: 1583523554022,
        Oleg: 1583523274022
      },
      {
        day: "TUE",
        John: 1583523576022,
        Marina: 1583523564022,
        Oleg: 1583523374022
      },
      {
        day: "WED",
        John: 1583523584022,
        Marina: 1583523577022,
        Oleg: 1583523544022
      },
      {
        day: "THU",
        John: 1583523586022,
        Marina: 1583523584022,
        Oleg: 1583523574022
      },
      {
        day: "FRY",
        John: 1583523594022,
        Marina: 1583523594022,
        Oleg: 1583523674022
      },
      {
        day: "SAT",
        John: 1583523594022,
        Marina: 1583523595022,
        Oleg: 1583523774022
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
        <XAxis
          dataKey="day"
          domain={["auto", "auto"]}
          tickFormatter={unixTime => moment(unixTime).format("HH:mm Do")}
          // type="number"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="John" fill="#8884d8" />
        <Bar dataKey="Marina" fill="#82ca9d" />
        <Bar dataKey="Oleg" fill="#888400" />
      </BarChart>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BarChartComponent);
