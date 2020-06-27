import React, { Component } from "react";
import moment from "moment";
import { UpCase } from "../../utils/UpperCase";
import { connect } from "react-redux";
import { editUser } from "../../store/actions/authAction";
import TextFormGroup from "../textForms/TextFormGroup";
//Phone Input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./auth.css";

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
        name: UpCase(this.props.name),
        email: this.props.email,
        phone: this.props.phone,
        location: this.props.location,
        errors: {},
      });
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
        <ul className="list-group">
          {/* Name */}
          <li className="list-group-item ">
            <div className="row">
              <div className="col-3 font-weight-bold">Name</div>
              <div className="col-9 text-left ">
                <TextFormGroup
                  onChange={this._onChange}
                  name="name"
                  value={this.state.name}
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
                />
              </div>
            </div>
          </li>
        </ul>
        <div className="my-3 mx-auto">
          <button onClick={this._onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps, { editUser })(UserEdit);
