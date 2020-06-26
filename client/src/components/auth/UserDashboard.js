import React, { Component } from "react";
import { connect } from "react-redux";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";
import { UpCase } from "../../utils/UpperCase";
import moment from "moment";

export class UserDashboard extends Component {
  render() {
    if (this.props.user) {
      return (
        <div className="py-4 text-center" style={{ height: 800 }}>
          <span className="display-4 text-white">User Dashboard</span>
          <div className="my-4 row ">
            <div className="col-md-6">
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
                      {`+${this.props.user.phone}`}
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
              </ul>
            </div>
            <div className="col-md-6">controls</div>
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
