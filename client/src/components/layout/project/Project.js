import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjects } from "../../../store/actions/projectAction";
import { isEmpty } from "../../../utils/isEmpty";
import { withRouter, Link } from "react-router-dom";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import moment from "moment";

export class Project extends Component {
  state = {
    projects: []
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
  _projectName = () => {
    console.log("clecked");
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
            <div className="row my-3 border">
              <div className="col-md-6 border">
                <div className="h5 text-center">Projects</div>
                {this.props.projects.map(project => (
                  <ul className="list-group" key={project._id}>
                    <li
                      className="list-group-item  btn btn-outline-primary my-2"
                      onClick={this._projectName}
                    >
                      <div className="row ">
                        <div className="col-md-6">
                          Name: {project.projectName}
                        </div>
                        <div className="col-md-6">
                          created: {moment(project.date).format("LL")}
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
              <div className="col-md-6 border">
                <div className="h6 text-center">Project Details</div>
              </div>
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
