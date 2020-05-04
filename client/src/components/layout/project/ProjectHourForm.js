//In this Component We can edit Start and End Work Hours
//If this.state.disableEditHours=true Disable Forms

import React, { Component } from "react";
class ProjectHourForm extends Component {
  state = {
    start: "",
    end: "",
    disableEditHours: false,
  };

  _onChangeHour = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    //clear errors in parent
    this.props.clearErrors();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this._parentHour(this.state);
    }
    // if (prevProps !== this.props) {
    //   this.setState({
    //     start: this.props.start,
    //     end: this.props.end,
    //   });
    // }
  }

  componentDidMount() {
    this.setState({
      start: this.props.start,
      end: this.props.end,
    });
  }

  _parentHour = (state) => {
    this.props.setHour(state);
  };

  //Toggle Disable Hours pair Editing
  _editHours = () => {
    this.setState({ disableEditHours: !this.state.disableEditHours });
    this.props.editWorkHours(this.state.disableEditHours);
  };

  render() {
    return (
      <div
        className=" text-center  rounded mt-3 px-5 py-2"
        style={{ backgroundColor: "#2a70a8" }}
      >
        <div className="my-3">
          <span className="text-white">{this.props.textTitle}</span>
        </div>
        <div className="mx-auto">
          <div className="group-control">
            <div className="form-group">
              <label style={{ fontWeight: "bold", color: "#f6f78b" }}>
                Start Hour
              </label>
              <input
                placeholder="07:00"
                name="start"
                type="text"
                className="form-control"
                onChange={this._onChangeHour}
                value={this.state.start}
                disabled={this.state.disableEditHours}
                style={{ backgroundColor: "#bfe1f5", borderStyle: "none" }}
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: "bold", color: "#e3c996" }}>
                End Hour
              </label>
              <input
                placeholder="17:30"
                name="end"
                type="text"
                className="form-control"
                value={this.state.end}
                onChange={this._onChangeHour}
                disabled={this.state.disableEditHours}
                style={{ backgroundColor: "#bfe1f5", borderStyle: "none" }}
              />
            </div>
            <small className="text-danger">{this.props.error}</small>
          </div>
          <div className="my-2">
            <label>
              <span className="text-white">Not Now</span>
              <input
                name="hours"
                type="checkbox"
                checked={this.state.disableEditHours}
                onChange={this._editHours}
                className="ml-2"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectHourForm;
