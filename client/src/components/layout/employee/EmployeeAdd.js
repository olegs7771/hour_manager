import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEmployee } from "../../../store/actions/employeeAction";
import { withRouter } from "react-router-dom";
import { getSelectedProject } from "../../../store/actions/projectAction";
import { HashLoaderSpinner } from "../../spinners/HashLoaderSpinner";
// import { isEmpty } from "../../../utils/isEmpty";
import TextFormGroup from "../../textForms/TextFormGroup";
import moment from "moment";

export class EmployeeAdd extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    func: "",
    started: "",
    employees: [],
    errors: {},
    openEmployeeForm: false,
    loading: false
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
        openEmployeeForm: false
      });
    }
  }

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });

    this.setState({ errors: {} });
  };

  //Add New Employee Form
  _onSubmit = e => {
    e.preventDefault();
    const newEmployee = {
      projectID: this.props.selectedProject._id,
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      started: this.state.started,
      func: this.state.func
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
        <div className="my-3 ">
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
          <div className="my-3 pl-3">
            {this.state.openEmployeeForm ? (
              <div className="my-3 border">
                {/* {Form Create New Employee} */}

                <form onSubmit={this._onSubmit} className="my-3 px-5">
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
                    label="Address"
                    placeholder="city,street"
                    onChange={this._onChange}
                    value={this.state.address}
                    name="address"
                    error={this.state.errors.address}
                  />
                  <TextFormGroup
                    label="Function"
                    placeholder="General laborer"
                    onChange={this._onChange}
                    value={this.state.func}
                    name="func"
                    error={this.state.errors.func}
                  />
                  <TextFormGroup
                    label="Started Job Date"
                    placeholder="01/10/2019"
                    onChange={this._onChange}
                    value={this.state.started}
                    name="started"
                    error={this.state.errors.started}
                  />
                  <div className="btn-group">
                    <button type="submit" className="btn btn-outline-info">
                      Save Employee
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => this.setState({ openEmployeeForm: false })}
                    >
                      Cancel
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
                <button
                  className="btn btn-outline-info"
                  onClick={() =>
                    this.setState({
                      openEmployeeForm: true
                    })
                  }
                >
                  Add Employee
                </button>
                {/* {Form Create New Employee} */}
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.employees.loading,
  selectedProject: state.projects.selectedProject,
  errors: state.errors.errors,
  messages: state.messages.messages
});

const mapDispatchToProps = { getSelectedProject, createEmployee };

EmployeeAdd.propTypes = {
  loading: PropTypes.bool,
  selectedProject: PropTypes.object,
  errors: PropTypes.object,
  messages: PropTypes.object,
  createEmployee: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeAdd));
