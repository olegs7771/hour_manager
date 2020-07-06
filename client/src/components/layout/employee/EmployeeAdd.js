import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEmployee } from "../../../store/actions/employeeAction";
import { withRouter } from "react-router-dom";
import { getSelectedProject } from "../../../store/actions/projectAction";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";

import TextFormGroup from "../../textForms/TextFormGroup";
import moment from "moment";
// import { isEmpty } from "../../../utils/isEmpty";

export class EmployeeAdd extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    phone: "",
    func: "",
    started: "",
    employees: [],
    errors: {},
    isFormOpened: false,
    loading: false,
  };

  componentDidMount() {
    this.props.getSelectedProject({ id: this.props.match.params.id });
  }

  componentDidUpdate(prevProps, prevState) {
    //Stop Loading if Errors,Message
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading });
    }
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, loading: false });
    }
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: this.props.messages,
        loading: false,
        isFormOpened: false,
      });
    }
    //Reload staff.length
    if (prevState.messages !== this.state.messages) {
      this.props.getSelectedProject({ id: this.props.match.params.id });
    }
  }

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });

    this.setState({ errors: {} });
  };

  //Add New Employee Form
  _onSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      projectID: this.props.selectedProject._id,
      managerID: this.props.selectedProject.user._id,
      managerName: this.props.selectedProject.user.name,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      started: this.state.started,
      func: this.state.func,
    };
    this.props.createEmployee(newEmployee);
  };

  render() {
    if (
      this.state.loading ||
      this.props.selectedProject === null ||
      this.props.errors === {}
    ) {
      return (
        <div
          className="mx-auto"
          style={{ paddingTop: "30%", paddingBottom: "30%" }}
        >
          <HashLoaderSpinner loading={true} />
        </div>
      );
    } else {
      const {
        // _id,
        companyCoreFunc,
        companyName,
        date,
        location,
        projectName,
        staff,
        user,
      } = this.props.selectedProject;
      return (
        <div
          className="py-3 border"
          style={{ height: this.state.isFormOpened ? "auto" : 700 }}
        >
          {/* Title */}
          <div className="h5 text-center my-4">
            <span className="text-white h4">Project </span>

            <span className="font-italic  h4" style={{ color: "#f7f30f" }}>
              {" "}
              {projectName[0].toUpperCase() + projectName.slice(1)}
            </span>
          </div>
          <div className="row ">
            <div className="col-md-6 border ">
              {/* Created */}
              <div className=" row border-bottom py-2">
                <div className="col-6  ">
                  <span className="text-white  ml-5">Created</span>
                </div>
                <div className="col-6 ">
                  <span className="font-italic " style={{ color: "#f7f30f" }}>
                    {" "}
                    {moment(date).format("LL")}
                  </span>
                </div>
              </div>
              {/* Company */}
              <div className=" row  border-bottom py-2">
                <div className="col-6  ">
                  <span className="text-white  ml-5">Company</span>
                </div>
                <div className="col-6 ">
                  <span className="font-italic " style={{ color: "#f7f30f" }}>
                    {" "}
                    {companyName[0].toUpperCase() + companyName.slice(1)}
                  </span>
                </div>
              </div>
              {/* Core Business */}
              <div className=" row border-bottom py-2">
                <div className="col-6  ">
                  <span className="text-white  ml-5">Core Business</span>
                </div>
                <div className="col-6 ">
                  <span className="font-italic " style={{ color: "#f7f30f" }}>
                    {" "}
                    {companyCoreFunc[0].toUpperCase() +
                      companyCoreFunc.slice(1)}
                  </span>
                </div>
              </div>
              {/* Location */}
              <div className=" row border-bottom py-2">
                <div className="col-6  ">
                  <span className="text-white  ml-5">Location</span>
                </div>
                <div className="col-6 ">
                  <span className="font-italic " style={{ color: "#f7f30f" }}>
                    {" "}
                    {location[0].toUpperCase() + location.slice(1)}
                  </span>
                </div>
              </div>
              {/* Manager */}
              <div className=" row border-bottom  py-2">
                <div className="col-6  ">
                  <span className="text-white  ml-5">Manager</span>
                </div>
                <div className="col-6 ">
                  <span className="font-italic " style={{ color: "#f7f30f" }}>
                    {" "}
                    {user.name[0].toUpperCase() + user.name.slice(1)}
                  </span>
                </div>
              </div>
              {/* Staff */}
              <div className=" row border-bottom py-2">
                <div className="col-6  ">
                  <span className="text-white  ml-5"> Staff</span>
                </div>
                <div className="col-6 ">
                  <span className="font-italic " style={{ color: "#f7f30f" }}>
                    {" "}
                    {staff.length}
                  </span>
                </div>
              </div>

              <div
                className={
                  window.innerWidth < 400
                    ? "btn-group my-3  d-flex "
                    : "btn-group my-3  d-flex pl-2"
                }
              >
                <button
                  className="btn btn-outline-info"
                  onClick={() =>
                    this.setState({
                      isFormOpened: true,
                    })
                  }
                >
                  <span className="text-white">Add Employee</span>
                </button>

                <button
                  className="btn btn-outline-secondary  "
                  onClick={() =>
                    this.props.history.push(
                      `/edit_project/${this.props.selectedProject._id}`
                    )
                  }
                >
                  <span className="text-white">Back To DashBoard</span>
                </button>
              </div>
            </div>
            {/* Form */}
            <div className="col-md-6">
              <div className="my-3 ">
                {this.state.isFormOpened ? (
                  <div className="my-3 ">
                    {/* {Form Create New Employee} */}
                    {this.state.errors ? (
                      <div className="my-3 text-center text-danger">
                        {this.state.errors.error}
                      </div>
                    ) : null}

                    <form onSubmit={this._onSubmit} className="my-3 px-5">
                      <TextFormGroup
                        label={
                          <span className="text-white font-weight-bold">
                            Name
                          </span>
                        }
                        placeholder="John Brown"
                        onChange={this._onChange}
                        value={this.state.name}
                        name="name"
                        error={this.state.errors.name}
                      />
                      <TextFormGroup
                        label={
                          <span className="text-white font-weight-bold">
                            Email
                          </span>
                        }
                        placeholder="john@example.com"
                        onChange={this._onChange}
                        value={this.state.email}
                        name="email"
                        error={this.state.errors.email}
                      />
                      <TextFormGroup
                        label={
                          <span className="text-white font-weight-bold">
                            Phone
                          </span>
                        }
                        placeholder="0520000000"
                        onChange={this._onChange}
                        value={this.state.phone}
                        name="phone"
                        error={this.state.errors.phone}
                      />
                      <TextFormGroup
                        label={
                          <span className="text-white font-weight-bold">
                            Address
                          </span>
                        }
                        placeholder="city,street"
                        onChange={this._onChange}
                        value={this.state.address}
                        name="address"
                        error={this.state.errors.address}
                      />
                      <TextFormGroup
                        label={
                          <span className="text-white font-weight-bold">
                            Function
                          </span>
                        }
                        placeholder="General laborer"
                        onChange={this._onChange}
                        value={this.state.func}
                        name="func"
                        error={this.state.errors.func}
                      />
                      <TextFormGroup
                        label={
                          <span className="text-white font-weight-bold">
                            Started Job Date
                          </span>
                        }
                        placeholder="01/10/2019"
                        onChange={this._onChange}
                        value={this.state.started}
                        name="started"
                        error={this.state.errors.started}
                      />
                      <div className="btn-group">
                        <button
                          type="submit"
                          className="btn btn-outline-info"
                          disabled={this.state.messages}
                        >
                          <span className="text-white">Save Employee</span>
                        </button>
                        <button
                          className="btn btn-outline-secondary ml-2"
                          onClick={() => this.setState({ isFormOpened: false })}
                        >
                          <span className="text-white ">Cancel</span>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="my-3 ">
                    {this.state.messages ? (
                      <div className="my-3 mx-auto">
                        <span className="text-success">
                          {this.state.messages.message}
                        </span>
                      </div>
                    ) : null}

                    {/* {Form Create New Employee} */}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Body */}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loading: state.employees.loading,
  selectedProject: state.projects.selectedProject,
  errors: state.errors.errors,
  messages: state.messages.messages,
});

const mapDispatchToProps = { getSelectedProject, createEmployee };

EmployeeAdd.propTypes = {
  loading: PropTypes.bool,
  selectedProject: PropTypes.object,
  errors: PropTypes.object,
  messages: PropTypes.object,
  createEmployee: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeAdd));
