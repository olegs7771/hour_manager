import React from "react";
import { UpCase } from "../../../utils/UpperCase";

const EmployeeTable = props => {
  return (
    <tbody>
      <tr>
        <th scope="row">{props.index}</th>
        <td>{UpCase(props.employeeName)}</td>
        <td>{props.employeeEmail}</td>
        <td>{props.address}</td>
        <td>{UpCase(props.projectName)}</td>
        <td>{UpCase(props.func)}</td>
        <td>{props.started}</td>
        <td>
          {props.confirmed ? (
            <span className="text-success">true</span>
          ) : (
            <span className="text-danger">not confirmed</span>
          )}
        </td>
      </tr>
    </tbody>
  );
};
export default EmployeeTable;
