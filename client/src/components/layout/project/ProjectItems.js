import React from "react";
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
      <li className="list-group-item">Project Manager{projectManager}</li>
      <li className="list-group-item">Project Name{projectName}</li>
      <li className="list-group-item">Company Name{companyName}</li>
      <li className="list-group-item">
        Business Core Function{companyCoreFunc}
      </li>
      <li className="list-group-item">Staff{staff}</li>
      <li className="list-group-item">Created{date}</li>
    </ul>
  );
};
export default ProjectDetails;
