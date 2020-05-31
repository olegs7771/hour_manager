import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

export class Footer extends Component {
  render() {
    return (
      <ul
        className="nav justify-content-start  py-4 px-2 "
        style={{ backgroundColor: "#303030" }}
      >
        <li className="nav-item">
          <a className="nav-link btn border rounded" href="/admin_contact">
            <div className="text-muted "> Contact Admin</div>
          </a>
          {/* <button className="btn btn-outline-secondary">Contact Admin</button> */}
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="/">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Link
          </a>
        </li> */}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
