import React, { Component } from "react";
import moment from "moment";
import { UpCase } from "../../utils/UpperCase";
import { connect } from "react-redux";
import { editUser, clearOutUser } from "../../store/actions/authAction";
import TextFormGroup from "../textForms/TextFormGroup";
//Phone Input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DotLoaderSpinner } from "../spinners/DotLoaderSpinner";

class UserEdit extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    location: "",
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    if (this.props.name) {
      this.setState({
        name: UpCase(this.props.name) ? UpCase(this.props.name) : "",
        email: this.props.email ? this.props.email : "",
        phone: this.props.phone ? this.props.phone : "",
        location: this.props.location ? this.props.location : "",
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages !== prevProps.messages) {
      console.log("messages changed");

      setTimeout(() => {
        console.log("time setout");
        this.props.clearOutUser();
      }, 3000);
    }
  }

  //Submit changes
  _onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    const payload = {
      uid: this.props.uid,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      location: this.state.location,
    };
    console.log("payload", payload);
    this.props.editUser(payload);
  };

  render() {
    return (
      <div>
        <ul
          className="list-group rounded p-3"
          style={{ backgroundColor: "#fff" }}
        >
          {/* Name */}
          <li className="list-group-item ">
            <div className="row">
              <div className="col-3 font-weight-bold">Name</div>
              <div className="col-9 text-left ">
                <TextFormGroup
                  onChange={this._onChange}
                  name="name"
                  value={this.state.name}
                  styleContainer={{ marginBottom: -16, marginTop: -7 }}
                  error={this.props.errors.name}
                />
              </div>
            </div>
          </li>

          {/* Email */}
          <li className="list-group-item ">
            <div className="row">
              <div className="col-3 font-weight-bold  ">Email</div>
              <div className="col-9 text-left ">
                <TextFormGroup
                  onChange={this._onChange}
                  name="email"
                  value={this.state.email}
                  styleContainer={{ marginBottom: -16, marginTop: -7 }}
                />
              </div>
            </div>
          </li>

          {/* Phone */}
          <li className="list-group-item ">
            <div className="row">
              <div className="col-3 font-weight-bold">Phone</div>
              <div className="col-8">
                <PhoneInput
                  country={"il"}
                  value={this.state.phone}
                  onChange={(phone) => this.setState({ phone })}
                  inputStyle={{ width: "113%" }}
                />
                {this.props.errors && (
                  <span className="text-danger">{this.props.errors.phone}</span>
                )}
              </div>
            </div>
          </li>
          {/* Location*/}
          <li className="list-group-item ">
            <div className="row">
              <div className="col-3 font-weight-bold  ">Location</div>
              <div className="col-9 text-left">
                <TextFormGroup
                  onChange={this._onChange}
                  name="location"
                  value={this.state.location}
                  styleContainer={{ marginBottom: -16, marginTop: -7 }}
                />
              </div>
            </div>
          </li>
        </ul>
        {this.props.loading ? (
          <DotLoaderSpinner />
        ) : this.props.messages ? (
          <span className="text-success">{this.props.messages.message}</span>
        ) : null}
        <div className="my-3 mx-auto">
          <button onClick={this._onSubmit} className="btn btn-outline-success">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  loading: state.auth.loading,
  messages: state.messages.messages,
});

export default connect(mapStateToProps, { editUser, clearOutUser })(UserEdit);
