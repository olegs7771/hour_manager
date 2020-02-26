import React from "react";
import moment from "moment";
const ProjectDetails = ({
  projectManager,
  projectName,
  companyName,
  companyCoreFunc,
  staff,
  date
}) => {
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
            <span className="text-muted ">
              {staff ? staff.legth : 0} persons
            </span>
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
    </ul>
  );
};
export default ProjectDetails;
