import {
  GET_PROJECTS,
  CREATE_PROJECT,
  GET_MESSAGE,
  GET_ERRORS,
  LOADING_PROJECT
} from "./types";
import axios from "axios";

//Get Projects By ID
//Private Route
export const getProjects = () => dispatch => {
  dispatch(loading());
  axios
    .get("/api/project/fetch")
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
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
    type: LOADING_PROJECT
  };
};
//ו
