import React, { Component } from "react";
import { Tooltip } from "reactstrap";

class ToolTip extends Component {
  state = {
    tooltipOpen: false,
    message: "",
  };

  _toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };
  componentDidMount() {
    this.setState({ message: this.props.message });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.message !== this.props.message)
  //     this.setState({ message: this.props.message });
  // }

  render() {
    return (
      <div>
        <span id="TooltipExample">{this.props.text}</span>

        <Tooltip
          placement="top"
          isOpen={this.state.tooltipOpen}
          target="TooltipExample"
          toggle={this._toggle}
        >
          {this.state.message}
        </Tooltip>
      </div>
    );
  }
}
export default ToolTip;
