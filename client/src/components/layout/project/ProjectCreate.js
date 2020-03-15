import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../../store/actions/projectAction";
import TextFormGroup from "../../textForms/TextFormGroup";
// import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";

import SelectFormGroup from "../../textForms/SelectFormGroup";

export class ProjectCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      companyName: "",
      location: "",
      companyCoreFunc: "",
      errors: {},
      messages: {},
      loading: false,
      //Work Day Hours
      start: "",
      end: ""
    };
  }
  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
    this.setState({ errors: {} });
  };
  _onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const data = {
      companyName: this.state.companyName,
      projectName: this.state.projectName,
      location: this.state.location,
      companyCoreFunc: this.state.companyCoreFunc
    };
    this.props.createProject(data);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, loading: false });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({ messages: this.props.messages, loading: false });
    }
  }
  render() {
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
      <div className="my-3 border p-2 ">
        <div className="h4 text-center my-3">Create Project</div>
        <div className="row">
          <div className="col-md-8">
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
              <div className="px-3 my-2 ">
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
          <div className="col-md-4 border">
            <div className="my-2 text-center">
              <p className="text-left">
                Here You can Choose Start and End Work Day hours.
                <br />
                It will help you more convinient trace Employee's job hours.
              </p>
              <div className="my-3 mx-auto">
                <label>
                  Name:
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>

                <label>
                  Name:
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  messages: state.messages.messages
});

const mapDispatchToProps = { createProject };
ProjectCreate.propTypes = {
  errors: PropTypes.object,
  messages: PropTypes.object,
  companyCoreFunc: PropTypes.string,
  companyName: PropTypes.string,
  location: PropTypes.string,
  projectName: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);
