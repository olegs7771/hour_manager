import React, { Component } from "react";
import { connect } from "react-redux";

export class ProjectEdit extends Component {
  componentDidMount() {
    console.log("selected project", this.props.selectedProject);
  }

  render() {
    return <div>Edit Project</div>;
  }
}

const mapStateToProps = state => ({
  selectedProject: state.projects.selectedProject
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
