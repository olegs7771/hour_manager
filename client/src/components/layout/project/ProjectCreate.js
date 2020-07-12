import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../../store/actions/projectAction";
import TextFormGroup from "../../textForms/TextFormGroup";
// import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
import ProjectHourForm from "./ProjectHourForm";

import SelectFormGroup from "../../textForms/SelectFormGroup";

export class ProjectCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      companyName: "",
      companyLocation: "",
      companyCoreFunc: "",
      errors: {},
      messages: {},
      loading: false,
      //Work Day Hours
      start: "00:00",
      end: "00:00",
      editWorkHours: true,
      //Picking Geolocation
      selectedCoords: null,
    };
  }
  _setHours = (data) => {
    this.setState({
      start: data.start,
      end: data.end,
    });
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });
    this.setState({ errors: {} });
  };
  _onSubmit = (e) => {
    e.preventDefault();
    //If User selected Not Now intrested to edit Work Hours
    if (this.state.editWorkHours) {
      if (this.state.start === "00:00" || this.state.end === "00:00") {
        return this.setState({
          errors: {
            timeError:
              "Please choose Work Time Hours. For Example: Start 07:00,End 17:00",
          },
        });
      }
      if (this.state.selectedCoords === null) {
        return this.setState({
          errors: {
            coords:
              "Please Edit Geolocation of your project. Move the Marker to desirable spot",
          },
        });
      }

      //Test for Work Hour form errors(22:00)
      const reg = /^[0-2][0-9]:[0-5][0-9]$/;
      if (reg.test(this.state.start) && reg.test(this.state.end)) {
        this.setState({ loading: true });
        const data = {
          companyName: this.state.companyName,
          projectName: this.state.projectName,
          location: this.state.companyLocation,
          companyCoreFunc: this.state.companyCoreFunc,
          jobStart: `${this.state.start}`,
          jobEnd: `${this.state.end}`,
          coords: {
            address: this.state.selectedCoords.address,
            coords: this.state.selectedCoords.coords,
          },
        };
        this.props.createProject(data);
      } else {
        this.setState({
          errors: {
            timeError:
              "Wrong time format. Please use 2 digits for hours annd 2 digits for minutes. Such as 07:35.",
          },
        });
      }
    } else {
      if (this.state.selectedCoords === null) {
        return this.setState({
          errors: {
            coords:
              "Please Edit Geolocation of your project. Move the Marker to desirable spot",
          },
        });
      }

      //  User selected Not Now intrested to edit Work Hours
      this.setState({ loading: true });
      const data = {
        companyName: this.state.companyName,
        projectName: this.state.projectName,
        location: this.state.companyLocation,
        companyCoreFunc: this.state.companyCoreFunc,
        jobStart: "00:00",
        jobEnd: "00:00",
        coords: {
          address: this.state.selectedCoords.address,
          coords: this.state.selectedCoords.coords,
        },
      };
      this.props.createProject(data);
    }
  };

  componentDidMount() {
    //In Pickin the Geolocation
    if (this.props.selectedCoords) {
      this.setState({ selectedCoords: this.props.selectedCoords });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, loading: false });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({ messages: this.props.messages, loading: false });
      //redirect to Project.js
      setTimeout(() => {
        this.props.history.push("/project");
      }, 5000);
    }
  }
  _clearError = () => {
    this.setState({ errors: {} });
  };
  _editWorkHours = (e) => {
    console.log("e in edit hours", e);
    this.setState({ editWorkHours: e });
  };

  _getCoordsToMap = async () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const data = {
        projectID: null,
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      };
      this.props.history.push("/map", { data });
    });
  };
  _cancelSelectedCoords = () => {
    this.setState({ selectedCoords: null });
  };

  componentWillUnmount() {
    this.setState({
      selectedCoords: null,
    });
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
      { label: "Financial", value: "Financial" },
    ];
    return (
      <div
        className="  p-4 "
        style={{ height: window.innerWidth > 500 ? "100vh" : "150vh" }}
      >
        <div className="h4 text-center text-white my-3">Create Project</div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this._onSubmit}>
              <TextFormGroup
                label={<span className="text-white">Company Name</span>}
                // placeholder="Company Name.."
                value={this.state.companyName}
                name="companyName"
                onChange={this._onChange}
                error={this.state.errors.companyName}
              />
              <TextFormGroup
                label={<span className="text-white">Project Name</span>}
                // placeholder="Project Name.."
                value={this.state.projectName}
                name="projectName"
                onChange={this._onChange}
                error={this.state.errors.projectName}
              />
              <TextFormGroup
                label={<span className="text-white">Company Location</span>}
                // placeholder="Company location.."
                value={this.state.companyLocation}
                name="companyLocation"
                onChange={this._onChange}
                error={this.state.errors.location}
              />
              <div className="px-3 my-2 ">
                <span className="font-italic text-white">
                  Please Select a Business Function that are carried out by your
                  enterprise.
                </span>
              </div>
              <SelectFormGroup
                options={options}
                name="companyCoreFunc"
                value={this.state.value}
                onChange={this._onChange}
                error={this.state.errors.companyCoreFunc}
              />
              {/* Add Project Geolocation */}

              <div className="my-5 border rounded p-4">
                {this.state.selectedCoords ? (
                  <div className=" text-center my-3 mx-auto">
                    <span className="text-white h6">Geolocation Selected</span>
                    <br />
                    <div className=" my-3  text-left " style={{ width: "80%" }}>
                      <span className="text-white font-weight-bold">
                        Address
                      </span>{" "}
                      <span style={{ color: "#e8fc0d" }}>
                        {this.state.selectedCoords.address}
                      </span>
                    </div>
                    <div className="my-3  text-left " style={{ width: "40%" }}>
                      <span className="text-white font-weight-bold">Lat </span>{" "}
                      <span style={{ color: "#e8fc0d" }}>
                        {this.state.selectedCoords.coords.lat}
                      </span>
                      <br />
                      <span className="text-white font-weight-bold">
                        Lng{" "}
                      </span>{" "}
                      <span style={{ color: "#e8fc0d" }}>
                        {this.state.selectedCoords.coords.lng}
                      </span>
                      <br />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center">
                      <span className="text-white h6 ">
                        Edit Geolocation of your project
                      </span>
                    </div>
                    <br />
                    <span className="text-white">
                      Please select address which includes street name
                    </span>
                  </div>
                )}
                {this.state.selectedCoords ? (
                  <input
                    type="button"
                    value="Cancel"
                    onClick={this._cancelSelectedCoords}
                    className="btn btn-outline-info my-3"
                  />
                ) : (
                  <input
                    type="button"
                    value="Add Coordenates"
                    onClick={this._getCoordsToMap}
                    className="btn btn-outline-info my-3"
                  />
                )}
              </div>
              <HashLoaderSpinner loading={this.state.loading} />
              {true ? (
                <div className="my-2 ">
                  <span className="text-success d-block mx-auto pl-4">
                    {this.state.messages.message}
                  </span>
                </div>
              ) : null}
              {this.state.errors.coords && (
                <div className="my-3">
                  <span className="text-danger">
                    {this.state.errors.coords}
                  </span>
                </div>
              )}
              <div className="my-1 ">
                <button
                  type="submit"
                  className="btn btn-outline-secondary d-block mx-auto my-3"
                >
                  <span className="text-white">Submit</span>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 pt-3">
            {/* {From Child Component} */}
            <ProjectHourForm
              //user doesnt want edit Work Hours at project creation
              editWorkHours={this._editWorkHours}
              setHour={(value) => {
                this._setHours(value);
              }}
              error={this.state.errors.timeError}
              clearErrors={this._clearError}
              textTitle={
                <p className="text-left font-italic">
                  Here You can Choose Start and End Work Day hours.
                  <br />
                  It will help you more convinient trace Employee's job hours.
                </p>
              }
              start={this.state.start}
              end={this.state.end}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  messages: state.messages.messages,
  selectedCoords: state.projects.selectedCoords,
});

const mapDispatchToProps = { createProject };
ProjectCreate.propTypes = {
  errors: PropTypes.object,
  messages: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);
