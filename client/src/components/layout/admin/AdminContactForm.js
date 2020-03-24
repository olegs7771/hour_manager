import React, { Component } from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";

const duration = 1000;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

export class AdminContactForm extends Component {
  state = {
    email: "",
    text: "",
    in: false
  };

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({ errors: {}, in: false });
  };

  _onSubmit = e => {
    e.preventDefault();
    const data = {
      text: this.state.text,
      email: this.state.email
    };
    if (this.state.email.length === 0) {
      this.setState({
        errors: { email: "Please provide your valid Email address" },
        in: true
      });
    }
    if (this.state.text.length === 0) {
      this.setState({
        errors: { text: "Text can not be emty" }
      });
    }
  };

  render() {
    return (
      <div className="border p-2">
        <div className="text-center  font-italic my-3" style={{ fontSize: 40 }}>
          Contact Admin
        </div>
        <form
          onSubmit={this._onSubmit}
          className="border p-5 d-block mx-auto"
          style={{ width: "60%" }}
        >
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder=" Your Email.."
              name="email"
              value={this.state.email}
              onChange={this._onChange}
            />

            <Transition in={this.state.in} timeout={duration}>
              {state => (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
                >
                  {this.state.errors ? (
                    <span>{this.state.errors.email}</span>
                  ) : null}
                </div>
              )}
            </Transition>

            {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Text here.."
              name="text"
              value={this.state.text}
              onChange={this._onChange}
            ></textarea>
          </div>
          <input
            type="submit"
            value="Submit"
            className="d-block mx-auto btn btn-outline-secondary"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContactForm);
