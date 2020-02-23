import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../../store/actions/projectAction";
import TextFormGroup from "../../textForms/TextFormGroup";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";

import SelectFormGroup from "../../textForms/SelectFormGroup";

export class ProjectCreate extends Component {
  state = {
    companyName: "",
    location: "",
    companyCoreFunc: "",
    errors: {},
    messages: {}
  };
  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
    const { companyName, location, companyCoreFunc } = this.state;

    this.setState({ errors: {} });
  };
  _onSubmit = e => {
    e.preventDefault();
    const data = {
      companyName: this.state.companyName,
      location: this.state.location,
      companyCoreFunc: this.state.companyCoreFunc
    };
    this.props.createProject(data);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
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
      <div className="my-3 border p-2">
        <div className="h4 text-center my-3">Create Project</div>
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

          <SelectFormGroup
            options={options}
            name="companyCoreFunc"
            value={this.state.value}
            onChange={this._onChange}
            error={this.state.errors.companyCoreFunc}
          />
          <DotLoaderSpinner />
          <div className="d-block mx-auto ">
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
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors
});

const mapDispatchToProps = { createProject };
ProjectCreate.propTypes = {
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);
