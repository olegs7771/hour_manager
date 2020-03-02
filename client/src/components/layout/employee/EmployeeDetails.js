import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployee } from "../../../store/actions/employeeAction";
import { DotLoaderSpinner } from "../../spinners/DotLoaderSpinner";

export class EmployeeDetails extends Component {
  componentDidMount() {
    this.props.getEmployee({ id: this.props.match.params.id });
  }

  render() {
    if (this.props.loading || this.props.selectedEmployee === null) {
      return (
        <div className="mx-auto " style={{ paddingTop: "30%" }}>
          <DotLoaderSpinner />
        </div>
      );
    } else {
      return (
        <div className="my-4 border">
          <div className="my-4 h5 text-center">
            <span className="display-4">Profile Employee Details</span>
          </div>
          <div className="mx-3 border">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedEmployee: state.employees.selectedEmployee
});

const mapDispatchToProps = { getEmployee };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeDetails));
