import { GET_PROJECTS, GET_MESSAGE } from "./types";
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
