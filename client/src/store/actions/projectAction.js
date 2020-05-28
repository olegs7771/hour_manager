import {
  GET_PROJECTS,
  GET_SELECTED_PROJECT,
  GET_MESSAGE,
  GET_ERRORS,
  LOADING_PROJECT,
  SELECT_COORDINATES,
} from "./types";
import axios from "axios";

//Get Projects By ID
//Private Route
export const getProjects = () => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/project/fetch")
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
      // if (res.data.project) {
      //   //If project null
      // }
    })
    .catch((err) => {
      console.log("error:", err.response.data);
    });
};

//Create Project
//Private Route
export const createProject = (data) => (dispatch) => {
  console.log("data in create project", data);

  axios
    .post("/api/project/create", data)
    .then((res) => {
      console.log("res.data create project", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err :", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Get Selected Project by ID
export const getSelectedProject = (data) => (dispatch) => {
  dispatch(loading());
  console.log("data selectproject", data);
  axios
    .post("/api/project/get_project", data)
    .then((res) => {
      // console.log("res.data", res.data);
      dispatch({
        type: GET_SELECTED_PROJECT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err", err.response.data);
    });
};

//Edit Selected Project
export const editProject = (data) => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/project/update", data)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err :", err.response.data);
    });
};

//Delete Project with All Employees!!!!+remove from user.projects[]
export const deleteProject = (data) => (dispatch) => {
  console.log("data in delete project", data);
  axios
    .post("/api/project/delete", data)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error to delete project", err.response.data);
    });
};

//Add the Coords to determind the area for Employees to be able get access for geolocation on their App

export const addCoords = (data) => (dispatch) => {
  console.log("data in adding coords and address", data);

  axios
    .post("/api/project/addCoords", data)
    .then((res) => {
      console.log("res.data addCoords", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err addCoords", err.response.data);
    });
};

//While creating new project the Manager can pick up GeoLocation
export const pickLocation = (data) => (dispatch) => {
  console.log("data pickLocation", data);
  dispatch({
    type: SELECT_COORDINATES,
    payload: data,
  });
};

//Loading

export const loading = () => {
  return {
    type: LOADING_PROJECT,
  };
};
//ו
