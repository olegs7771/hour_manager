import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getSelectedProject,
  editProject
} from "../../../store/actions/projectAction";
import { withRouter, Link } from "react-router-dom";
import TextFormGroup from "../../textForms/TextFormGroup";
import SelectFormGroup from "../../textForms/SelectFormGroup";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
import { UpCase } from "../../../utils/UpperCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

export class ProjectEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectID: "",
      projectName: "",
      companyName: "",
      location: "",
      companyCoreFunc: "",
      staff: [],
      errors: {},
      messages: {},
      loading: false,
      selectedProject: null
    };
  }
  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
    this.setState({ errors: {} });
  };

  componentDidMount() {
    this.props.getSelectedProject({
      id: this.props.match.params.id
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedProject !== this.props.selectedProject) {
      const {
        _id,
        projectName,
        companyName,
        location,
        companyCoreFunc,
        staff
      } = this.props.selectedProject;

      this.setState({
        projectID: _id,
        projectName,
        companyName,
        location,
        companyCoreFunc,
        staff
      });
    }
    //Get Loading to State
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading ? true : false });
    }
    //Get selectedProject to State
    if (prevProps.selectedProject !== this.props.selectedProject) {
      this.setState({
        selectedProject: this.props.selectedProject
          ? this.props.selectedProject
          : null
      });
    }
    //Get Errors to State
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors ? this.props.errors : {}
      });
    }
    //Get Messages to State
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: this.props.messages ? this.props.messages : {},
        loading: null
      });
    }
  }
  //On Submit edit Project Details

  _onSubmit = e => {
    e.preventDefault();
    const upProject = {
      companyName: this.state.companyName,
      location: this.state.location,
      companyCoreFunc: this.state.companyCoreFunc
    };
    this.props.editProject(upProject);
  };

  render() {
    if (this.state.loading || this.state.selectedProject === null) {
      return (
        <div className="h3 text-center " style={{ paddingTop: "30%" }}>
          <HashLoaderSpinner />
        </div>
      );
    } else if (this.state.messages.message) {
      return (
        <div className="my-3 ">
          <span className="text-success text-center h5">
            {this.state.messages.message}
          </span>
          <div className="my-3  ">
            <button
              className="d-flex align-items-center btn btn-outline-secondary"
              onClick={() => this.props.history.push("/project")}
            >
              Back to Projects{" "}
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                size="2x"
                className="ml-3"
              />
            </button>
          </div>
        </div>
      );
    } else {
      // Select options for Business functions;
      const options = [
        { label: "* Select The Core Function", value: null },
        { label: "General Management", value: "General Management" },
        { label: "Public relations", value: "Public relations" },
        { label: "Purchasing", value: "Purchasing" },
        { label: "Human Resources", value: "Human Resources" },
        { label: "Production", value: "Production" },
        { label: "Administration", value: "Administration" },
        { label: "Marketing", value: "Marketing" },
        { label: "Financial", value: "Financial" }
      ];
      return (
        <div className="my-3 border p-3">
          <div className="my-3 text-center h5">DashBoard Project</div>
          <p className=" font-weight-light mb-4 text-center">
            Here you can edit project details, add or remove staff members
          </p>
          <div className="row my-3  mx-4">
            <div className="col-md-6">
              <form onSubmit={this._onSubmit}>
                <TextFormGroup
                  label="Company Name"
                  value={
                    this.state.companyName
                      ? UpCase(this.state.companyName)
                      : this.state.companyName
                  }
                  name="companyName"
                  onChange={this._onChange}
                  error={this.state.errors.companyName}
                />
                <TextFormGroup
                  label="Business Function (Select from option below)"
                  value={
                    this.state.companyCoreFunc
                      ? UpCase(this.state.companyCoreFunc)
                      : this.state.companyCoreFunc
                  }
                  name="companyCoreFunc"
                  onChange={this._onChange}
                  error={this.state.errors.companyCoreFunc}
                />
                <TextFormGroup
                  label="Company Location"
                  value={
                    this.state.location
                      ? UpCase(this.state.location)
                      : this.state.location
                  }
                  name="location"
                  onChange={this._onChange}
                  error={this.state.errors.location}
                />
                <div className="px-3 my-2">
                  Please Select a Business Function that are carried out by your
                  enterprise.
                </div>
                <SelectFormGroup
                  options={options}
                  name="companyCoreFunc"
                  value={this.state.value}
                  onChange={this._onChange}
                  error={this.state.errors.companyCoreFunc}
                />

                <div className="my-1 ">
                  <button
                    type="submit"
                    className="btn btn-outline-secondary d-block mx-auto my-3"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* STAFF */}

            <div className="col-md-6  ">
              <div className="my-3 text-center">Staff Manager</div>
              <div className="d-flex justify-content-between px-5">
                <button
                  className="btn btn-outline-info"
                  onClick={() =>
                    this.props.history.push(
                      `/employees/${this.props.selectedProject._id}`
                    )
                  }
                >
                  {" "}
                  Employees{" "}
                  <span className="h5">{this.state.staff.length}</span>
                </button>

                <button
                  className="btn btn-outline-success  "
                  onClick={() =>
                    this.props.history.push(
                      `/employee_add/${this.props.selectedProject._id}`
                    )
                  }
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedProject: state.projects.selectedProject,
  loading: state.projects.loading,
  messages: state.messages.messages,
  errors: state.errors.errors
});

const mapDispatchToProps = { getSelectedProject, editProject };

ProjectEdit.propTypes = {
  selectedProject: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectEdit));
