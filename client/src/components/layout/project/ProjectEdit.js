import React, { Component } from "react";
import { connect } from "react-redux";
import { getSelectedProject } from "../../../store/actions/projectAction";
import { withRouter } from "react-router-dom";
import TextFormGroup from "../../textForms/TextFormGroup";
import SelectFormGroup from "../../textForms/SelectFormGroup";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
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
      loading: false
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
    const {
      _id,
      projectName,
      companyName,
      location,
      companyCoreFunc,
      staff
    } = this.props.selectedProject;
    if (prevProps.selectedProject !== this.props.selectedProject) {
      this.setState({
        projectID: _id,
        projectName,
        companyName,
        location,
        companyCoreFunc,
        staff
      });
    }
  }

  render() {
    if (this.props.selectedProject) {
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
          <div className="my-3 text-center h5">Edit Project</div>
          <p className=" font-weight-light mb-4">
            Here you can edit project details, add or remove staff members
          </p>
          <form onSubmit={this._onSubmit}>
            <TextFormGroup
              label="Company Name"
              // placeholder="Company Name.."
              value={this.state.companyName}
              name="companyName"
              onChange={this._onChange}
              error={this.state.errors.companyName}
            />
            <TextFormGroup
              label="Project Name"
              // placeholder="Project Name.."
              value={this.state.projectName}
              name="projectName"
              onChange={this._onChange}
              error={this.state.errors.projectName}
            />
            <TextFormGroup
              label="Company Location"
              // placeholder="Company location.."
              value={this.state.location}
              name="location"
              onChange={this._onChange}
              error={this.state.errors.location}
            />
            <div className="px-3 my-2">
              Please Select a Business Function that are carried out by your
              enterprise.
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectFormGroup
                  options={options}
                  name="companyCoreFunc"
                  value={this.state.value}
                  onChange={this._onChange}
                  error={this.state.errors.companyCoreFunc}
                />
              </div>
              <div className="col-md-6 border">
                <div className="span text-center mb-2">Staff</div>
                <div className="row">
                  <div className="col-md-6 border">
                    <button
                      className="btn btn-outline-info d-block mx-auto"
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
                  </div>
                  <div className="col-md-6 border">
                    <button
                      className="btn btn-outline-success d-block mx-auto"
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

            <HashLoaderSpinner loading={this.state.loading} />
            {true ? (
              <div className="my-2 ">
                <span className="text-success d-block mx-auto pl-4">
                  {this.state.messages.message}
                </span>
              </div>
            ) : null}
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
      );
    } else {
      return (
        <div className="h3 text-center " style={{ paddingTop: "30%" }}>
          <HashLoaderSpinner />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedProject: state.projects.selectedProject
});

const mapDispatchToProps = { getSelectedProject };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectEdit));