import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjects } from "../../../store/actions/projectAction";
import { isEmpty } from "../../../utils/isEmpty";

export class Project extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    //Fetch Projects
    this.props.getProjects();
  }

  render() {
    if (isEmpty(this.state.projects)) {
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
        <div className="my-2">
          <div className="my-2 border">
            <h2 className="text-center">Projects</h2>
            <p className="font-weight-light pl-3">
              Dear User here you can Create,Edit and Manage your Projects.{" "}
              <br />
              In Order to create new Project press Create button
            </p>
          </div>
          <div className="row my-3 border">
            <div className="col-md-6 border">
              <div className="h4 text-center">Project</div>
            </div>
            <div className="col-md-6 border">
              <div className="h4 text-center">Project Details</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});

const mapDispatchToProps = { getProjects };

Project.propTypes = {
  projects: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
