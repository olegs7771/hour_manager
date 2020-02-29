import React from "react";
import { UpCase } from "../../../utils/UpperCase";

const EmployeeTable = props => {
  return (
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>{UpCase(props.employeeName)}</td>
        <td>{props.employeeEmail}</td>
        <td>{props.address}</td>
        <td>{UpCase(props.projectName)}</td>
        <td>{UpCase(props.func)}</td>
        <td>{UpCase(props.func)}</td>
      </tr>
    </tbody>
  );
};
export default EmployeeTable;
