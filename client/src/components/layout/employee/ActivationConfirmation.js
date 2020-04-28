import React, { Component } from "react";

class ActivationConfirmation extends Component {
  render() {
    const { uid, projectID } = this.props.match.params;
    return (
      <div>
        Confirmation Here
        <span>{uid}</span>
        <br />
        <span>{projectID}</span>
      </div>
    );
  }
}

export default ActivationConfirmation;
