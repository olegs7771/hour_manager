import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEmployee,
  updateEmployee
} from "../../../store/actions/employeeAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";
import { UpCase } from "../../../utils/UpperCase";
import { withRouter } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextFormGroup from "../../textForms/TextFormGroup";

export class EmployeeEdit extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    phone: "",
    func: "",
    started: "",
    selectedEmployee: null,
    messages: {},
    errors: {}
  };

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
    this.setState({ errors: {} });
  };

  componentDidMount() {
    this.props.getEmployee({ id: this.props.match.params.id });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedEmployee !== this.props.selectedEmployee) {
      const {
        name,
        email,
        phone,
        address,
        func,
        started
      } = this.props.selectedEmployee;

      this.setState({
        name,
        email,
        phone,
        address,
        func,
        started,
        selectedEmployee: true
      });
    }

    // GET Errors in State
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors, selectedEmployee: true });
    }

    // GET Loading in State
    if (prevProps.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading ? true : null });
    }
    // GET Messages in State
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        messages: this.props.messages,
        selectedEmployee: true,
        loading: null
      });
    }
  }

  _onSubmit = e => {
    e.preventDefault();
    const { name, email, phone, address, func, started } = this.state;

    const upEmployee = {
      id: this.props.match.params.id,
      projectID: this.props.selectedEmployee.projectID,
      name,
      email,
      phone,
      address,
      func,
      started
    };
    this.props.updateEmployee(upEmployee);
  };

  render() {
    if (this.state.loading || this.state.selectedEmployee === null) {
      return (
        <div className="mx-auto " style={{ paddingTop: "30%" }}>
          <DotLoaderSpinner />
        </div>
      );
    } else if (this.state.errors.error) {
      return <div className="my-4">{this.state.errors.error}</div>;
    } else if (this.state.messages.message) {
      return (
        <div className="my-4 text-center h5">{this.state.messages.message}</div>
      );
    } else {
      return (
        <div className="my-4 border">
          <div className="my-3 text-center h5">Edit Details of Employee</div>
          <div className="my-3 px-5">
            <form onSubmit={this._onSubmit}>
              <TextFormGroup
                label="Name"
                value={this.state.name}
                name="name"
                onChange={this._onChange}
                error={this.state.errors.name}
              />
              <TextFormGroup
                label="Email"
                value={this.state.email}
                name="email"
                onChange={this._onChange}
                error={this.state.errors.email}
              />
              <TextFormGroup
                label="Phone"
                value={this.state.phone ? this.state.phone : this.state.phone}
                name="phone"
                onChange={this._onChange}
                error={this.state.errors.phone}
              />
              <TextFormGroup
                label="Address"
                value={
                  this.state.address ? this.state.address : this.state.address
                }
                name="address"
                onChange={this._onChange}
                error={this.state.errors.address}
              />
              <TextFormGroup
                label="Function"
                value={this.state.func ? this.state.func : this.state.func}
                name="func"
                onChange={this._onChange}
                error={this.state.errors.func}
              />
              <TextFormGroup
                label="Started Job"
                value={
                  this.state.started ? this.state.started : this.state.started
                }
                name="started"
                onChange={this._onChange}
                error={this.state.errors.started}
              />
              <div className="my-3">
                <button type="submit" className="btn btn-outline-secondary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedEmployee: state.employees.selectedEmployee,
  errors: state.errors.errors,
  loading: state.employees.loading,
  messages: state.messages.messages
});

const mapDispatchToProps = { getEmployee, updateEmployee };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeEdit));
