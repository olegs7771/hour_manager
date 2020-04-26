import React, { Component } from "react";

class ProjectHourForm extends Component {
  state = {
    start: "",
    end: "",
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
  }

  _parentHour = (state) => {
    this.props.setHour(state);
  };

  render() {
    return (
      <div className=" text-center">
        <div className="my-3">{this.props.textTitle}</div>
        <div className="mx-auto">
          <div className="group-control">
            <div className="form-group">
              <label>Start Hour</label>
              <input
                placeholder="07:00"
                name="start"
                type="text"
                className="form-control"
                onChange={this._onChangeHour}
                value={this.state.start}
              />
            </div>
            <div className="form-group">
              <label>End Hour</label>
              <input
                placeholder="17:30"
                name="end"
                type="text"
                className="form-control"
                value={this.state.end}
                onChange={this._onChangeHour}
              />
            </div>
            <small className="text-danger">{this.props.error}</small>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectHourForm;
