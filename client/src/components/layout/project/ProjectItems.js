import React, { Component } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import Popup from "../popup/Popup";
import TextFormGroup from "../../textForms/SelectFormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faUserMinus,
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

class ProjectItems extends Component {
  render() {
    console.log("this.props.staff", this.props.staff.length);

    const {
      id,
      projectManager,
      projectName,
      companyName,
      companyCoreFunc,
      staff,
      date,
    } = this.props;
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold">Project Manager</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ml-4">
                {projectManager[0].toLocaleUpperCase() +
                  projectManager.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold">Project Name</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ml-4">
                {projectName[0].toLocaleUpperCase() + projectName.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold">Company Name</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ">
                {companyName[0].toLocaleUpperCase() + companyName.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold">Business Core Function</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ">
                {companyCoreFunc[0].toLocaleUpperCase() +
                  companyCoreFunc.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold">Staff</span>{" "}
            </div>
            <div className="col-md-6">
              <span className="text-muted ">{staff.length} </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold">Project Created </span>{" "}
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
            onClick={() => this.props.history.push(`/edit_project/${id}`)}
          >
            View Project
          </button>
          {/* <button
            className="btn btn-outline-danger ml-2"
            onPress={this._deleteProject}
          >
            Delete Project
          </button> */}
          <Popup
            open={this.state.open}
            icon="Delete Project"
            margin={10}
            title={<span className="text-danger pl-5">Delete Warning</span>}
            placement={"top"}
            body={
              <div className=" mx-auto ">
                <span className="text-danger">
                  All Data will be deleted permanently <br />
                  To proceed fill Employee's Email
                </span>
                <TextFormGroup
                  placeholder="Employee Email.."
                  onChange={this._onChange}
                  value={this.state.email}
                  name="email"
                  type="email"
                />
                <button
                  className="btn btn-outline-danger"
                  disabled={!this.state.match}
                  onClick={this._deleteEmployee.bind(
                    this,
                    this.props.selectedEmployee._id
                  )}
                >
                  Confirm
                </button>
                {this.state.match ? (
                  <span className="text-success ml-5">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                ) : null}
              </div>
            }
          />
        </div>
      </ul>
    );
  }
}

export default withRouter(ProjectItems);
