import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSelectedProject } from "../../../store/actions/projectAction";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
import { isEmpty } from "../../../utils/isEmpty";
import TextFormGroup from "../../textForms/TextFormGroup";
import moment from "moment";
export class EmployeeAdd extends Component {
  state = {
    name: "",
    email: "",
    func: "",
    started: "",
    employees: [],
    errors: {}
  };

  componentDidMount() {
    this.props.getSelectedProject({ id: this.props.match.params.id });
  }

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });

    this.setState({ errors: {} });
  };

  render() {
    if (this.props.loading || this.props.selectedProject === null) {
      return (
        <div className="mx-auto" style={{ paddingTop: "30%" }}>
          <HashLoaderSpinner loading={true} />
        </div>
      );
    } else {
      const {
        _id,
        companyCoreFunc,
        companyName,
        date,
        location,
        projectName,
        staff,
        user
      } = this.props.selectedProject;
      return (
        <div className="my-3 border">
          <div className="h5 text-center">
            Project
            <span className="font-italic text-success">
              {} {projectName[0].toUpperCase() + projectName.slice(1)}
            </span>
          </div>
          <div className="my-3  pl-3">
            Created:{" "}
            <span className="font-italic text-success">
              {" "}
              {moment(date).format("LL")}
            </span>
            <br />
            Company:{" "}
            <span className="font-italic text-success">
              {" "}
              {companyName[0].toUpperCase() + companyName.slice(1)}
            </span>
            <br />
            Core Business:{" "}
            <span className="font-italic text-success">
              {" "}
              {companyCoreFunc[0].toUpperCase() + companyCoreFunc.slice(1)}
            </span>
            <br />
            Location:{""}
            <span className="font-italic text-success">
              {" "}
              {location[0].toUpperCase() + location.slice(1)}
            </span>
            <br />
            Manager:{""}
            <span className="font-italic text-success">
              {" "}
              {user.name[0].toUpperCase() + user.name.slice(1)}
            </span>
            <br />
            Staff:{""}
            <span className="font-italic text-success"> {staff.length}</span>
            <br />
          </div>
          <div className="my-3 border pl-3">
            <button className="btn btn-outline-info">Add Employee</button>
            {/* {Form Create New Employee} */}
            <div className="my-3 border px-5">
              <TextFormGroup
                label="Name"
                placeholder="John Brown"
                onChange={this._onChange}
                value={this.state.name}
                name="name"
                error={this.state.errors.name}
              />
              <TextFormGroup
                label="Email"
                placeholder="john@example.com"
                onChange={this._onChange}
                value={this.state.email}
                name="email"
                error={this.state.errors.email}
              />
              <TextFormGroup
                label="Function"
                placeholder="General laborer"
                onChange={this._onChange}
                value={this.state.func}
                name="email"
                error={this.state.errors.func}
              />
              <TextFormGroup
                label="Started Job Date"
                placeholder="01/10/2019"
                onChange={this._onChange}
                value={this.state.func}
                name="started"
                error={this.state.errors.started}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.employees.loading,
  selectedProject: state.projects.selectedProject
});

const mapDispatchToProps = { getSelectedProject };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeAdd));
