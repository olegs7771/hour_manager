import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

export default class ToolTip extends Component {
  render() {
    return (
      <div>
        <a data-tip data-for="happyFace">
          {" "}
          d(`･∀･)b{" "}
        </a>
        <ReactTooltip id="happyFace" type="error">
          <span>Show happy face</span>
        </ReactTooltip>
      </div>
    );
  }
}
