import React, { Component } from "react";
import { connect } from "react-redux";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";
import { UpCase } from "../../utils/UpperCase";
import moment from "moment";
import UserEdit from "./UserEdit";
//Phone Input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export class UserDashboard extends Component {
  state = {
    editUser: false,
  };
  render() {
    if (this.props.user) {
      return (
        <div className="py-4 text-center" style={{ height: 800 }}>
          <span className="display-4 text-white">User Dashboard</span>
          <div className="my-4 row ">
            <div className="col-md-6">
              {/* Edit User */}
              {this.state.editUser ? (
                <UserEdit
                  uid={this.props.user.id}
                  name={this.props.user.name}
                  email={this.props.user.email}
                  phone={this.props.user.phone}
                  location={this.props.user.location}
                />
              ) : (
                <ul className="list-group">
                  {/* Name */}
                  <li className="list-group-item ">
                    <div className="row">
                      <div className="col-3 font-weight-bold">Name</div>
                      <div className="col-9 text-left">
                        {UpCase(this.props.user.name)}
                      </div>
                    </div>
                  </li>
                  {/* Email */}
                  <li className="list-group-item ">
                    <div className="row">
                      <div className="col-3 font-weight-bold  ">Email</div>
                      <div className="col-9 text-left">
                        {this.props.user.email}
                      </div>
                    </div>
                  </li>
                  {/* Phone */}
                  <li className="list-group-item ">
                    <div className="row">
                      <div className="col-3 font-weight-bold  ">Phone</div>
                      <div className="col-9 text-left">
                        <PhoneInput
                          country={"il"}
                          value={this.props.user.phone}
                          onChange={(phone) => this.setState({ phone })}
                          inputStyle={{ width: "90%", paddingRight: 20 }}
                        />
                        {/* {this.props.user.phone} */}
                      </div>
                    </div>
                  </li>
                  {/* Location*/}
                  <li className="list-group-item ">
                    <div className="row">
                      <div className="col-3 font-weight-bold  ">Location</div>
                      <div className="col-9 text-left">
                        {this.props.user.location}
                      </div>
                    </div>
                  </li>
                  {/* Date */}
                  <li className="list-group-item ">
                    <div className="row">
                      <div className="col-3 font-weight-bold  ">Created</div>
                      <div className="col-9 text-left">
                        {moment(this.props.user.date).format("LL")}
                      </div>
                    </div>
                  </li>
                  {/* Projects */}
                  <li className="list-group-item ">
                    <div className="row">
                      <div className="col-3 font-weight-bold  ">Projects</div>
                      <div className="col-9 text-left">
                        {this.props.user.projects.length === 0 ? (
                          <span>No projects</span>
                        ) : (
                          <span>{this.props.user.projects.length}</span>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </div>
            <div className="col-md-6">
              <div className="btn-group">
                <button className="btn btn-outline-info">
                  <span
                    className="text-white"
                    onClick={() =>
                      this.setState({ editUser: !this.state.editUser })
                    }
                  >
                    Edit
                  </span>
                </button>
                <button className="btn btn-outline-info ml-2">
                  <span className="text-warning ">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <DotLoaderSpinner />;
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
