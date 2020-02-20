import {
  REGISTER_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  GET_ERRORS,
  GET_MESSAGE
} from "./types";
import axios from "axios";

// Registration new user

export const registerUser = data => dispatch => {
  console.log("data", data);
  axios
    .post("/api/auth/register", data)
    .then(res => {
      console.log("res.data", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log("error :", err.response.data);
    });
};

//Login User
export const loginUser = data => dispatch => {
  axios
    .post("/api/auth/login", data)
    .then(res => {
      if (res.data.token) {
        //We Got Token
        const { token } = res.data;
        //Set token to localStorage
        localStorage.setItem("jwtToken", token);
        //Set token to Auth header (we crerate it in separate file)
      } else {
        dispatch({
          type: GET_MESSAGE,
          payload: res.data
        });
      }
      console.log("res.data", res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log("error :", err.response.data);
    });
};
