import {
  GET_ALL_EMPLOYEES,
  LOADING,
  GET_MESSAGE,
  GET_ERRORS,
  GET_SELECTED_EMPLOYEE
} from "./types";
import axios from "axios";

//Get All Employees from Selected Project
export const getAllEmployees = data => dispatch => {
  dispatch(loading());
  axios
    .post("/api/project/get_employees_all", data)
    .then(res => {
      dispatch(loading());
      console.log("res.data", res.data);
      dispatch({
        type: GET_ALL_EMPLOYEES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err:", err.response.data);
    });
};

//Create New Employee
export const createEmployee = data => dispatch => {
  dispatch(loading());
  axios
    .post("/api/employee/create", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err :", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Get Selected Employee
export const getEmployee = data => dispatch => {
  axios
    .post("/api/employee/get_employee", data)
    .then(res => {
      dispatch(loading());
      dispatch({
        type: GET_SELECTED_EMPLOYEE,
        payload: res.data
      });
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err.response.data", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Delete  Employee by ID
export const deleteEmployee = data => dispatch => {
  console.log("data", data);
  axios
    .post("/api/employee/delete", data)
    .then(res => {
      dispatch(loading());
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });

      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err:", err.response.data);
    });
};

//Update Employee Details
export const updateEmployee = data => dispatch => {
  dispatch(loading());
  console.log("data", data);
  axios
    .post("/api/employee/update", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err :", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Loading

export const loading = () => {
  return {
    type: LOADING
  };
};
