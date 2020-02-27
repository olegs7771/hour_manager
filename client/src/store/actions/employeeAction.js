import { GET_ALL_EMPLOYEES, LOADING_EMPLOYEES } from "./types";
import axios from "axios";
//Get All Employees from Selected Project
export const getAllEmployees = data => dispatch => {
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

//Loading

export const loading = () => {
  return {
    type: LOADING_EMPLOYEES
  };
};
