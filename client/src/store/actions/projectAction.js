import { GET_PROJECTS, GET_MESSAGE, GET_ERRORS } from "./types";
import axios from "axios";

//Get Projects By ID
//Private Route
export const getProjects = () => dispatch => {
  axios
    .get("/api/project/fetch")
    .then(res => {
      console.log("project", res.data.project);
      // if (res.data.project) {
      //   //If project null
      // }
    })
    .catch(err => {
      console.log("error:", err.response.data);
    });
};

//Create Project
//Private Route
export const createProject = data => dispatch => {
  axios
    .post("/api/project/create", data)
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err :", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
