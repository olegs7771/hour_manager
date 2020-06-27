import React, { Component } from "react";
import moment from "moment";
import { UpCase } from "../../utils/UpperCase";
import { connect } from "react-redux";
import { editUser } from "../../store/actions/authAction";
//Phone Input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
              <div className="col-9 text-left">
                <input
                  type="text"
                  value={this.state.name}
                  style={{
                    borderStyle: "none",

                    marginTop: -5,
                    marginBottom: -5,
                  }}
                  onChange={this._onChange}
                  name="name"
                />
              </div>
            </div>
          </li>
          {/* Email */}
          <li className="list-group-item ">
            <div className="row">
              <div className="col-3 font-weight-bold  ">Email</div>
              <input
                type="text"
                value={this.state.email}
                style={{
                  borderStyle: "none",
                  paddingLeft: 15,
                  marginTop: -5,
                  marginBottom: -5,
                }}
                onChange={this._onChange}
                name="email"
              />
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
                  inputStyle={{ width: "90%" }}
                />
              </div>
              {/* <input
                type="text"
                value={this.state.phone}
                style={{
                  borderStyle: "none",
                  paddingLeft: 15,
                  marginTop: -5,
                  marginBottom: -5,
                }}
                onChange={this._onChange}
                name="phone"
              /> */}
            </div>
          </li>
          {/* Location*/}
          <li className="list-group-item ">
            <div className="row">
              <div className="col-3 font-weight-bold  ">Location</div>
              <input
                type="text"
                value={this.state.location}
                style={{
                  borderStyle: "none",
                  paddingLeft: 15,
                  marginTop: -5,
                  marginBottom: -5,
                }}
                onChange={this._onChange}
                name="location"
              />
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

export default connect(null, { editUser })(UserEdit);
