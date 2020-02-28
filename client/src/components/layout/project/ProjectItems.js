import React, { Component } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";

class ProjectDetails extends Component {
  render() {
    console.log("this.props.staff", this.props.staff.length);

    const {
      id,
      projectManager,
      projectName,
      companyName,
      companyCoreFunc,
      staff,
      date
    } = this.props;
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-light">Project Manager</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ml-4">{projectManager}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-light">Project Name</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ml-4">{projectName}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-light">Company Name</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ">{companyName}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-light">Business Core Function</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ">{companyCoreFunc}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-light">Staff</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ">{staff.length} </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-light">Project Created </span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted text-right">
                {moment(date).format("LL")}
              </span>
            </div>
          </div>
        </li>

        <div className="btn-group my-3 mx-auto">
          {/* <Link to={`edit_project/${id}`}>Edit Project</Link> */}
          <button
            className="btn btn-outline-info"
            onClick={() => this.props.history.push(`edit_project/${id}`)}
          >
            View Project
          </button>
          <button className="btn btn-outline-danger ml-2">
            Delete Project
          </button>
        </div>
      </ul>
    );
  }
}

export default withRouter(ProjectDetails);
