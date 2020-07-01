import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { deleteProject } from "../../../store/actions/projectAction";
import { withRouter } from "react-router-dom";
import Popup from "../popup/Popup";
import TextFormGroup from "../../textForms/TextFormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";

class ProjectItems extends Component {
  state = {
    //Local State
    name: "",
    match: false,
    //toggle Button Delete Project/Cancel. True or false coming from Popup.js
    switchBtn: false,
    loading: false,
    //Props from Redux
    message: null,
  };

  _deleteProject = (e) => {
    this.setState({ loading: true });
    const payload = {
      id: e,
    };
    this.props.deleteProject(payload);
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  _changeBtn = (e) => {
    console.log("e change btn", e);
    this.setState({ switchBtn: e ? true : false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      if (this.state.name === this.props.projectName) {
        this.setState({ match: true });
      } else {
        this.setState({ match: false });
      }
    }
    //After delete project->this.state.loading->this.state.message
    if (prevProps.message !== this.props.message) {
      this.setState({ message: this.props.message, loading: false });
      setTimeout(() => {
        //reload Project.js
        this.props.reloadParent();
      }, 4000);
    }
  }

  render() {
    console.log("this.props.staff", this.props.staff.length);

    const {
      id,
      projectManager,
      projectName,
      companyName,
      companyCoreFunc,
      staff,
      date,
      coords,
      address,
    } = this.props;

    if (this.state.loading) {
      return (
        <div className="my-3  mt-5 mb-5">
          <div className="my-3">
            <DotLoaderSpinner />
          </div>
        </div>
      );
    }
    if (this.state.message)
      return (
        <div className="my-3  mt-5 mb-5">
          <div className="my-3">
            <div className="h6 text-center text-success">Success!</div>
          </div>
          <div className="text-center text-success">{this.state.message}</div>
        </div>
      );

    return (
      <ul className="list-group ">
        <li className="list-group-item " style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">
                Project Manager
              </span>{" "}
            </div>
            <div className="col-md-6">
              <span className=" " style={{ color: "#fafc6a" }}>
                {projectManager[0].toLocaleUpperCase() +
                  projectManager.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">Project Name</span>{" "}
            </div>
            <div className="col-md-6">
              <span className=" " style={{ color: "#fafc6a" }}>
                {projectName[0].toLocaleUpperCase() + projectName.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">Company Name</span>{" "}
            </div>
            <div className="col-md-6">
              <span className=" " style={{ color: "#fafc6a" }}>
                {companyName[0].toLocaleUpperCase() + companyName.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">
                Business Core Function
              </span>{" "}
            </div>
            <div className="col-md-6">
              <span className=" " style={{ color: "#fafc6a" }}>
                {companyCoreFunc[0].toLocaleUpperCase() +
                  companyCoreFunc.slice(1)}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">Staff</span>{" "}
            </div>
            <div className="col-md-6">
              <span className=" " style={{ color: "#fafc6a" }}>
                {staff.length}{" "}
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">
                Project Created{" "}
              </span>{" "}
            </div>
            <div className="col-md-6">
              <span className=" text-right" style={{ color: "#fafc6a" }}>
                {moment(date).format("LL")}
              </span>
            </div>
          </div>
        </li>
        {/* Coordinates */}
        <li className="list-group-item" style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">Coordinates </span>{" "}
            </div>
            <div className="col-md-6">
              {coords && (
                <div>
                  <span className="text-white">lat</span>{" "}
                  <span className=" text-right" style={{ color: "#fafc6a" }}>
                    {coords.lat}
                  </span>
                  <br />
                  <span className="text-white">lng </span>{" "}
                  <span className=" text-right" style={{ color: "#fafc6a" }}>
                    {coords.lng}
                  </span>
                </div>
              )}
              {!coords && (
                <span className="text-danger">Coordinates not set</span>
              )}
            </div>
          </div>
        </li>
        <li className="list-group-item" style={{ backgroundColor: "#2a70a8" }}>
          <div className="row">
            <div className="col-md-6">
              <span className="font-weight-bold text-white">Address </span>{" "}
            </div>
            <div className="col-md-6">
              {address && (
                <span className=" text-right" style={{ color: "#fafc6a" }}>
                  {address}
                </span>
              )}
              {!address && <span className="text-danger">Address not set</span>}
            </div>
          </div>
        </li>

        <div className="btn-group my-3 mx-auto">
          {/* <Link to={`edit_project/${id}`}>Edit Project</Link> */}
          <button
            className="btn btn-outline-info"
            onClick={() => this.props.history.push(`/edit_project/${id}`)}
          >
            View Project
          </button>
          {/* <button
            className="btn btn-outline-danger ml-2"
            onPress={this._deleteProject}
          >
            Delete Project
          </button> */}
          <Popup
            icon={this.state.switchBtn ? "Cancel" : "Delete Project"}
            margin={10}
            title={<span className="text-danger pl-5">Delete Warning</span>}
            placement={"top"}
            //toggle Button Delete Project/Cancel
            open={this._changeBtn}
            body={
              <div className=" mx-auto ">
                <span className="text-danger">
                  All Data such as all employees profiles in current project
                  will be deleted permanently <br />
                  To proceed fill Project's Name
                </span>
                <TextFormGroup
                  placeholder="Project Name.."
                  onChange={this._onChange}
                  value={this.state.name}
                  name="name"
                  // type="name"
                />
                <button
                  className="btn btn-outline-danger"
                  disabled={!this.state.match}
                  onClick={this._deleteProject.bind(this, id)}
                >
                  Confirm
                </button>
                {this.state.match ? (
                  <span className="text-success ml-5">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                ) : null}
              </div>
            }
          />
        </div>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.messages.messages.message,
});

export default connect(mapStateToProps, { deleteProject })(
  withRouter(ProjectItems)
);
