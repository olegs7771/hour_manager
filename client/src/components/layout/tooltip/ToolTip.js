import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

export default class ToolTip extends Component {
  render() {
    return (
      <div>
        <a data-tip={this.props.tip} data-for="happyFace">
          {this.props.text}
        </a>

        <ReactTooltip
          id="happyFace"
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
