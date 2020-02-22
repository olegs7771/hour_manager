import React, { Component } from "react";
import { connect } from "react-redux";
import { clearOutUser } from "../../../store/actions/authAction";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
export class Header extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth) {
      if (!this.props.auth.isAuthenticated) {
        this.setState({ isAuthenticated: false });
      } else {
        this.setState({ isAuthenticated: true });
      }
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({ isAuthenticated: true });
    }
  }
  _logOut = () => {
    localStorage.removeItem("jwtToken");
    this.props.clearOutUser();
    this.props.history.push("/login");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home">
          HourManager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/#">
                  Action
                </a>
                <a className="dropdown-item" href="/#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
          {this.state.isAuthenticated ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/project">
                  Projects
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/project">
                  <span className="text-success font-weight-normal">
                    {this.props.auth.user.name}
                  </span>
                </a>
              </li>
              <li className="nav-item active">
                <button
                  className="btn btn-outline-secondary"
                  onClick={this._logOut}
                >
                  SingOut
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/login">
                  SignIn
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/register">
                  SingUp
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  clearOutUser
};

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
