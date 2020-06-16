import React, { Component } from "react";
import { connect } from "react-redux";
import { checkEmailExists } from "../../store/actions/authAction";
import "./recover.css";

class PasswordRecovery extends Component {
  state = {
    isRecoverBySMS: false,
    isRecoverBySecret: false,
    email: "",
    errors: {},
    //for checking if  Email Exists onMouseLeave Event
    isUserStartedToFillEmailField: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (this.state.email !== prevState.email) {
      this.setState({ isUserStartedToFillEmailField: true });
    }
  }

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
    });

    this.setState({ errors: {} });
  };

  //Check Email on mouseLeave Event
  _onMouseLeave = () => {
    if (this.state.isUserStartedToFillEmailField) {
      console.log("checking Email");
      this.props.checkEmailExists({ email: this.state.email });
    }
  };

  render() {
    return (
      <div style={{ height: 700 }}>
        <div className="my text-center">
          <span className="display-4 text-white">Password Recover</span>
        </div>
        <div className="my-3  text-center">
          <span className="text-white" style={{ fontSize: 20 }}>
            Choose to recover password by SMS or Secred Question
          </span>
          <div
            className="my-5  mx-auto"
            style={{ width: window.innerWidth > 500 ? "50%" : "100%" }}
          >
            <form
              onSubmit={this._onSubmitSecret}
              className={{ width: window.innerWidth > 500 ? "px-5 " : "px-5" }}
            >
              <input
                type="text"
                placeholder={"brown@exemple.com"}
                onChange={this._onChange}
                onMouseLeave={this._onMouseLeave}
                onMouseEnter={() => this.setState({ errors: {} })}
                value={this.state.email}
                className={this.state.errors.error ? "field-invalid " : "field"}
                name="email"
              />
              <div className="row my-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder={"secret question"}
                    onChange={this._onChange}
                    onMouseLeave={this._onMouseLeave}
                    onMouseEnter={() => this.setState({ errors: {} })}
                    value={this.state.secretQuestion}
                    className={
                      this.state.errors.error ? "field-invalid " : "field"
                    }
                    name="secretQuestion"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder={"answer"}
                    onChange={this._onChange}
                    onMouseLeave={this._onMouseLeave}
                    onMouseEnter={() => this.setState({ errors: {} })}
                    value={this.state.secretAnswer}
                    className={
                      this.state.errors.error ? "field-invalid " : "field"
                    }
                    name="secretAnswer"
                  />
                </div>
              </div>
              {this.state.errors.error && (
                <div className="">
                  <span className="text-danger">{this.state.errors.error}</span>
                </div>
              )}
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
});

const mapDispatchToProps = { checkEmailExists };

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
