import React, { Component } from "react";
import { connect } from "react-redux";
import { checkEmailExists, getUser } from "../../store/actions/authAction";
import "./recover.css";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

class PasswordRecovery extends Component {
  state = {
    //Local State
    isRecoverBySMS: false,
    isRecoverBySecret: false,
    //Redux State
    email: "",
    errors: {},
    loading: false,
    status: false,
    secretAnswer1: "",
    secretAnswer2: "",
    isSubmitted: false,
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });

    this.setState({ errors: {}, isSubmitted: false, status: null });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({
        errors: this.props.errors,
        status: this.props.status,
        user: this.props.user,
      });
    }

    if (
      this.state.email !== prevState.email &&
      this.state.email.length > 10 &&
      this.state.status === null
    ) {
      this.setState({ errors: {}, secretQuestion1: "", secretQuestion2: "" });
      this.props.checkEmailExists({
        email: this.state.email,
      });
    }

    if (this.state.status !== prevState.status) {
      if (this.state.status) {
        //Get User
        setTimeout(() => {
          this.props.getUser({ email: this.state.email });
        }, 2000);
      }
    }
    if (this.state.user !== prevState.user) {
      if (this.state.user) {
        this.setState({
          errors: {},
          secretQuestion1: this.state.user.secretQuestion1,
          secretQuestion2: this.state.user.secretQuestion2,
        });
      }
    }
  }

  _onSubmitSecret = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true }); //Prevent from spliting row, showing error exclamation
    //Email Field Validation
    if (this.state.email.length === 0) {
      return this.setState({
        errors: {
          email:
            "Please enter your valid Email which been used during registration",
        },
      });
    }
    if (this.state.email.length < 10) {
      return this.setState({
        errors: {
          email: "Complete the E-mail which been used during registration",
        },
      });
    }
    if (Object.keys(this.state.errors).length > 0) {
      return this.setState({ errors: { email: "Fix all the errors first!" } });
    }

    //Secret Question/Answer Validation
    if (this.state.secretAnswer1.length === 0) {
      return this.setState({ errors: { secretAnswer1: "Enter Valid Answer" } });
    }
    if (this.state.secretAnswer2.length === 0) {
      return this.setState({ errors: { secretAnswer2: "Enter Valid Answer" } });
    }

    const payload = {
      secretAnswer1: this.state.secretAnswer1,
      secretAnswer2: this.state.secretAnswer2,
      uid: this.state.user._id,
    };
  };

  render() {
    return (
      <div style={{ height: 700 }}>
        <div className="my text-center">
          <span className="display-4 text-white">Account Recovery </span>
        </div>
        <div className="my-3  text-center">
          <span className="text-white" style={{ fontSize: 20 }}>
            Choose to recover password by SMS or Secred Question
          </span>
          <div
            className="my-5  mx-auto "
            style={{ width: window.innerWidth > 500 ? "50%" : "100%" }}
          >
            <div className="my-3">
              <span className="text-white">Please fill in your E-mail</span>
            </div>
            <form
              onSubmit={this._onSubmitSecret}
              className={{
                width: window.innerWidth > 500 ? "px-5 " : "px-5",
              }}
            >
              {/* Split if email true or error occured */}
              {this.state.status ||
              (this.state.errors.email && this.state.isSubmitted) ? (
                <div className="row">
                  <div className="col-md-11">
                    <input
                      type="text"
                      placeholder={"brown@exemple.com"}
                      onChange={this._onChange}
                      onMouseEnter={() => this.setState({ errors: {} })}
                      value={this.state.email}
                      className={classnames(
                        "field",
                        {
                          "field-invalid": this.state.errors.email,
                        },
                        {
                          "field-valid": this.state.status,
                        }
                      )}
                      name="email"
                    />
                  </div>
                  {this.state.status && (
                    <div className="col-md-1">
                      <span className="text-success">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    </div>
                  )}
                  {this.state.errors.email && (
                    <div className="col-md-1">
                      <span className="text-danger">
                        <FontAwesomeIcon icon={faExclamation} />
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder={"brown@exemple.com"}
                  onChange={this._onChange}
                  // onMouseLeave={this._onMouseLeave}
                  value={this.state.email}
                  className={classnames(
                    "field",
                    {
                      "field-invalid": this.state.errors.email,
                    },
                    {
                      "field-valid": this.state.status,
                    }
                  )}
                  name="email"
                />
              )}

              {/* First Secret Pair */}
              {/* {If Error then split on 3 col} */}

              {this.state.errors.secretAnswer1 ? (
                <div className="row my-3">
                  <div className="col-md-6">
                    <div
                      className="border rounded py-1"
                      style={{ backgroundColor: "#FFF", height: 33 }}
                    >
                      {this.state.user ? (
                        <span>{this.state.secretQuestion1}</span>
                      ) : (
                        <span>1 Question</span>
                      )}
                    </div>
                  </div>
                  {/* Secret Answer 1 */}
                  <div className="col-md-5">
                    <input
                      type="text"
                      placeholder={" your answer"}
                      onChange={this._onChange}
                      value={this.state.secretAnswer1}
                      className={
                        this.state.errors.secretAnswer1
                          ? "field-invalid "
                          : "field"
                      }
                      name="secretAnswer1"
                    />
                  </div>
                  <div className="col-md-1">
                    <span className="text-danger">
                      <FontAwesomeIcon icon={faExclamation} />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="row my-3">
                  <div className="col-md-6">
                    <div
                      className="border rounded py-1"
                      style={{ backgroundColor: "#FFF", height: 33 }}
                    >
                      {this.state.user ? (
                        <span>{this.state.secretQuestion1}</span>
                      ) : (
                        <span>1 Question</span>
                      )}
                    </div>
                  </div>
                  {/* Secret Answer 1 */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder={" your answer"}
                      onChange={this._onChange}
                      value={this.state.secretAnswer1}
                      className={
                        this.state.errors.secretAnswer1
                          ? "field-invalid "
                          : "field"
                      }
                      name="secretAnswer1"
                    />
                  </div>
                </div>
              )}
              {/* Second Secret Pair */}
              {/* {If Error then split on 3 col} */}

              {this.state.errors.secretAnswer2 ? (
                <div className="row my-3">
                  <div className="col-md-6">
                    <div
                      className="border rounded py-2"
                      style={{ backgroundColor: "#FFF", height: 33 }}
                    >
                      {this.state.user ? (
                        <span>{this.state.secretQuestion2}</span>
                      ) : (
                        <span>2 Question</span>
                      )}
                    </div>
                  </div>
                  {/* Secret Answer 2 */}
                  <div className="col-md-5">
                    <input
                      type="text"
                      placeholder={" your answer"}
                      onChange={this._onChange}
                      value={this.state.secretAnswer2}
                      className={
                        this.state.errors.secretAnswer2
                          ? "field-invalid "
                          : "field"
                      }
                      name="secretAnswer1"
                    />
                  </div>
                  <div className="col-md-1">
                    <span className="text-danger">
                      <FontAwesomeIcon icon={faExclamation} />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="row my-3">
                  <div className="col-md-6">
                    <div
                      className="border rounded py-1"
                      style={{ backgroundColor: "#FFF", height: 33 }}
                    >
                      {this.state.user ? (
                        <span>{this.state.secretQuestion2}</span>
                      ) : (
                        <span>2 Question</span>
                      )}
                    </div>
                  </div>
                  {/* Secret Answer 1 */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder={" your answer"}
                      onChange={this._onChange}
                      value={this.state.secretAnswer2}
                      className={
                        this.state.errors.secretAnswer2
                          ? "field-invalid "
                          : "field"
                      }
                      name="secretAnswer1"
                    />
                  </div>
                </div>
              )}

              {Object.keys(this.state.errors).length > 0 && (
                <div className="border py-1 text-danger">
                  {this.state.errors.email}
                  {this.state.errors.error}
                  {this.state.errors.secretAnswer1}
                  {this.state.errors.secretAnswer2}
                </div>
              )}

              <input
                type="submit"
                value="Submit"
                className="btn btn-outline-secondary"
                style={{ color: "#fff" }}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  messages: state.messages.messages,
  user: state.auth.user,

  status: state.auth.status,
});

const mapDispatchToProps = { checkEmailExists, getUser };

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
