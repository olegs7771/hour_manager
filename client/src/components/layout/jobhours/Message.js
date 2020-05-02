import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div className="border rounded p-2 mb-4">
        <div className="text-center h6">Message</div>
        <p>{this.props.message}</p>
        <div className="py-2"></div>
      </div>
    );
  }
}

export default Message;
