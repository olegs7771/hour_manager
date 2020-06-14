import React, { Component } from "react";

export default class NoPage404 extends Component {
  render() {
    return (
      <div className="text-center " style={{ height: 700, paddingTop: "10%" }}>
        <span className="display-4 text-white">404 ! </span>

        <div className="my-3">
          <span className="display-4 text-white">
            The Requested Page was not found..
          </span>
        </div>
      </div>
    );
  }
}
