import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFormGroup from "../textForms/TextFormGroup";

export class Register extends Component {
  state = {
    form: {
      name: "",
      email: "",
      phone: "",
      password: ""
    }
  };

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="div my-2">
        <form>
          <TextFormGroup
            label="Name"
            placeholder="John Brown"
            onChange={this._onChange}
            value={this.state.form.name}
            name="name"
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
