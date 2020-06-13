import React, { Component } from "react";
import { connect } from "react-redux";
import { sendEmailToAdmin } from "../../../store/actions/adminAction";
import { Transition } from "react-transition-group";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";

const duration = 1000;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  color: " red",
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export class AdminContactForm extends Component {
  state = {
    name: "",
    email: "",
    text: "",
    in: false,
    loading: false,
    messages: {},
    errors: {},
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.setState({ errors: {}, in: false });
  };

  _onSubmit = (e) => {
    e.preventDefault();
    const data = {
      text: this.state.text,
      email: this.state.email,
      name: this.state.name,
    };
    if (this.state.name.length === 0) {
      return this.setState({
        errors: { name: "Please provide your name" },
        in: true,
      });
    }
    if (this.state.email.length === 0) {
      return this.setState({
        errors: { email: "Please provide your valid Email address" },
        in: true,
      });
    }
    if (this.state.text.length === 0) {
      return this.setState({
        errors: { text: "Text can not be emty" },
        in: true,
      });
    }
    this.setState({ loading: true });

    console.log("data", data);
    this.props.sendEmailToAdmin(data);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages !== prevProps.messages) {
      this.setState({ messages: this.props.messages, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="my-5">
          <DotLoaderSpinner />
        </div>
      );
    } else if (this.state.messages.message) {
      return (
        <div className="my-5 pl-5">
          <span className="text-success h5">{this.state.messages.message}</span>
          <br />

          <a href="/" className="btn my-4 border rounded">
            Go Back
          </a>
        </div>
      );
    } else {
      return (
        <div className="border pb-5">
          <div
            className="text-center  font-italic my-3 text-white"
            style={{ fontSize: 40 }}
          >
            Contact Admin
          </div>
          <form
            onSubmit={this._onSubmit}
            className="border p-5 d-block mx-auto"
            style={{ width: "60%" }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder=" Your Name.."
                name="name"
                value={this.state.name}
                onChange={this._onChange}
              />

              <Transition in={this.state.in} timeout={duration}>
                {(state) => (
                  <div
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                  >
                    {this.state.errors ? (
                      <span>{this.state.errors.name}</span>
                    ) : null}
                  </div>
                )}
              </Transition>
            </div>
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
                {(state) => (
                  <div
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                  >
                    {this.state.errors ? (
                      <span>{this.state.errors.email}</span>
                    ) : null}
                  </div>
                )}
              </Transition>

              <small id="emailHelp" className="form-text text-white">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group ">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Text here.."
                name="text"
                value={this.state.text}
                onChange={this._onChange}
              ></textarea>
            </div>
            <Transition in={this.state.in} timeout={duration}>
              {(state) => (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                >
                  {this.state.errors ? (
                    <div style={{ marginTop: -10 }}>
                      {this.state.errors.text}
                    </div>
                  ) : null}
                </div>
              )}
            </Transition>
            <div className="my-5 ">
              <input
                type="submit"
                value="Submit"
                className="d-block mx-auto btn btn-outline-secondary my-3"
                style={{ color: "#FFF" }}
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
});

const mapDispatchToProps = { sendEmailToAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(AdminContactForm);
