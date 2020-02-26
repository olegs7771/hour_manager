import React, { Component } from "react";
import { connect } from "react-redux";
import { getSelectedProject } from "../../../store/actions/projectAction";
import { withRouter } from "react-router-dom";
export class ProjectEdit extends Component {
  componentDidMount() {
    this.props.getSelectedProject({
      id: this.props.match.params.id
    });
  }

  render() {
    console.log("this.props", this.props);
    return <div>Edit Project</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { getSelectedProject };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectEdit));
