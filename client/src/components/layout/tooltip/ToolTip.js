import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

export default class ToolTip extends Component {
  render() {
    return (
      <div>
        <span data-tip={this.props.tip} data-for="tooltip">
          {this.props.text}
        </span>

        <ReactTooltip
          id="tooltip"
          getContent={[
            (dataTip) => {
              return <span>{dataTip}</span>;
            },
          ]}
        />
      </div>
    );
  }
}
