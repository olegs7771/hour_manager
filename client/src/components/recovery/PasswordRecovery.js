import React, { Component } from "react";
import { connect } from "react-redux";
import {
  checkEmailExists,
  getUser,
  checkSecretPair,
  clearErrors,
} from "../../store/actions/authAction";
import "./recover.css";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";
import NewPasswordForm from "./NewPasswordForm";
import TextFormGroup from "../textForms/TextFormGroup";

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
    secretCheck: false,
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });

    this.setState({ errors: {}, isSubmitted: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loading !== prevProps.loading) {
      this.setState({ loading: this.props.loading });
    }
    if (this.props !== prevProps) {
      this.setState({
        errors: this.props.errors,
        status: this.props.status,
        user: this.props.user,
      });
    }
    //Validation Email.

    if (
      this.state.email !== prevState.email &&
      this.state.email.length > 10 &&
      !this.state.status
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

    if (this.state.email !== prevState.email && this.state.status) {
      this.setState({ status: false });
      this.props.checkEmailExists({
        email: this.state.email,
      });
    }
    //After Checking for secret pair
    if (prevProps.secretCheck !== this.props.secretCheck) {
      this.setState({ secretCheck: this.props.secretCheck });
    }
    //Clear Errors in Redux
    if (
      this.state.secretAnswer1 !== prevState.secretAnswer1 ||
      this.state.secretAnswer2 !== prevState.secretAnswer2
    ) {
      if (this.props.errors.secretAnswer1 || this.props.errors.secretAnswer2) {
        this.props.clearErrors();
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
    console.log("payload", payload);
    this.props.checkSecretPair(payload);
  };

  render() {
    return (
      <div style={{ height: 700 }}>
        <div className="my text-center">
          <span className="display-4 text-white">Account Recovery </span>
        </div>
        {/* if secretCheck true show create new password form */}
        {this.state.secretCheck ? (
          <NewPasswordForm uid={this.state.user._id} />
        ) : (
          <div className="my-3  text-center">
            <span className="text-white" style={{ fontSize: 20 }}>
              Choose to recover password by SMS or Secred Question
            </span>
            <div
              className="my-5  mx-auto "
              style={{ width: window.innerWidth > 500 ? "50%" : "100%" }}
            >
              {this.state.loading ? (
                <div className="my-3">
                  <DotLoaderSpinner />
                  <span className="text-white">Loading User Info..</span>
                </div>
              ) : this.state.user ? (
                <div className="my-3" style={{ height: 63.63 }}>
                  <span className="text-white"> The User been found!</span>
                  <br />
                  <span className="text-white"> Now answer the Questions</span>
                </div>
              ) : (
                <div className="my-3" style={{ height: 63.63 }}>
                  <span className="text-white">Please fill in your E-mail</span>
                </div>
              )}
              <form
                onSubmit={this._onSubmitSecret}
                className={{
                  width: window.innerWidth > 500 ? "px-5 " : "px-5",
                }}
              >
                <TextFormGroup
                  placeholder={
                    this.state.errors.email ? "" : "brown@exemple.com"
                  }
                  onChange={this._onChange}
                  onMouseEnter={() => this.setState({ errors: {} })}
                  value={this.state.email}
                  error={this.state.errors.email}
                  message={this.state.status}
                  feedback={this.state.status}
                  name="email"
                />

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
                        placeholder={
                          this.state.errors.secretAnswer1 ? "" : " your answer"
                        }
                        onChange={this._onChange}
                        value={this.state.secretAnswer1}
                        className={
                          this.state.errors.secretAnswer1
                            ? "field-invalid "
                            : "field"
                        }
                        name="secretAnswer1"
                        onMouseEnter={() =>
                          this.setState({ errors: { secretAnswer1: null } })
                        }
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
                        placeholder={
                          this.state.errors.secretAnswer2 ? "" : " your answer"
                        }
                        onChange={this._onChange}
                        value={this.state.secretAnswer2}
                        className={
                          this.state.errors.secretAnswer2
                            ? "field-invalid "
                            : "field"
                        }
                        name="secretAnswer2"
                        onMouseEnter={() =>
                          this.setState({ errors: { secretAnswer2: null } })
                        }
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
                        name="secretAnswer2"
                      />
                    </div>
                  </div>
                )}

                {Object.keys(this.state.errors).length > 0 && (
                  <div className=" pb-2 text-danger">
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
                  disabled={Object.keys(this.state.errors).length > 0}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  messages: state.messages.messages,
  user: state.auth.user,
  loading: state.auth.loading,
  status: state.auth.status, //checking if email exists
  secretCheck: state.auth.secretCheck,
});

const mapDispatchToProps = {
  checkEmailExists,
  getUser,
  checkSecretPair,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
