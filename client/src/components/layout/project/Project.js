import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjects } from "../../../store/actions/projectAction";
import { isEmpty } from "../../../utils/isEmpty";
import { withRouter, Link } from "react-router-dom";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import moment from "moment";
import ProjectItems from "./ProjectItems";
import ProjectDetails from "./ProjectItems";

export class Project extends Component {
  state = {
    projects: [],
    showDetails: false,
    projectDetails: {}
  };

  componentDidMount() {
    //Fetch Projects
    this.props.getProjects();

    console.log("fetch projects");
  }
  _createProject = () => {
    this.props.history.push("/create_project");
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.projects !== this.props.projects) {
      this.setState({ projects: this.props.projects });
    }
  }
  _projectName = e => {
    console.log("e", e);
    this.setState({
      projectDetails: {
        id: e._id,
        projectManager: e.user.name,
        projectName: e.projectName,
        companyName: e.companyName,
        companyCoreFunc: e.companyCoreFunc,
        staff: e.staff,
        date: e.date
      },
      showDetails: true
    });
  };

  render() {
    if (this.props.projects === null || this.props.loading) {
      return <DotLoaderSpinner />;
    } else {
      if (isEmpty(this.props.projects)) {
        return (
          <div className="my-4 ">
            <h4 className="text-center">Projects</h4>
            <div className="row my-3 mx-auto border">
              <div className="col-md-6 ">
                <p className="text-muted pl-3">
                  Dear {this.props.auth.user.name} here you can Create,Edit and
                  Manage your Projects. <br />
                  In Order to create new Project press Create button
                </p>
              </div>
              <div className="col-md-6   pt-3">
                <button
                  className="btn btn-outline-success d-block mx-auto "
                  onClick={this._createProject}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="my-4">
            <div className="my2 border">
              <button
                className="btn btn-outline-info"
                onClick={this._createProject}
              >
                Add Project
              </button>
            </div>
            <div className="row my-3 ">
              <div className="col-md-6 border">
                <div className="h5 text-center my-4">Projects</div>
                {this.props.projects.map(project => (
                  <ul className="list-group" key={project._id}>
                    {/* Button Project Name + Date */}
                    <li
                      className="list-group-item  btn btn-outline-primary mb-1"
                      onClick={this._projectName.bind(this, project)}
                    >
                      <div className="row ">
                        <div className="col-md-6  d-flex justify-content-around">
                          <span className="text-left">Project:</span>
                          {project.projectName}
                        </div>
                        <div className="col-md-6 d-flex justify-content-around">
                          <span className="text-left">Created:</span>
                          {moment(project.date).format("LL")}
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
              {this.state.showDetails ? (
                <div className="col-md-6 border">
                  <div className="h5 text-center my-4">Project Details</div>
                  <ProjectItems
                    id={this.state.projectDetails.id}
                    projectManager={this.state.projectDetails.projectManager}
                    projectName={this.state.projectDetails.projectName}
                    companyName={this.state.projectDetails.companyName}
                    companyCoreFunc={this.state.projectDetails.companyCoreFunc}
                    staff={this.state.projectDetails.staff}
                    date={this.state.projectDetails.date}
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects.projects,
  loading: state.projects.loading
});

const mapDispatchToProps = { getProjects };

Project.propTypes = {
  projects: PropTypes.array,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Project));
