import {
  SET_CURRENT_USER,
  CLEAR_OUT_USER,
  GET_ERRORS,
  GET_MESSAGE,
  LOADING_USER,
  CONFIRMED_USER,
  GET_USER_DETAILS,
} from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Registration new user

export const registerUser = (data) => (dispatch) => {
  console.log("data", data);
  axios
    .post("/api/auth/register", data)
    .then((res) => {
      console.log("res.data", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      console.log("error :", err.response.data);
    });
};

//Confirmatin of Temp User via Email URL link

export const confirmUser = (data) => (dispatch) => {
  dispatch(loading());
  console.log("confirm data", data);
  axios
    .post("/api/auth/confirm_registration", data)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: CONFIRMED_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Check if Email Exists In DB onMouseleave Event

export const checkEmailExists = (data) => (dispatch) => {
  console.log("data testing email", data);
  axios
    .post("/api/auth/check_email", data)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error testing email if exists", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Login User
export const loginUser = (data, history) => (dispatch) => {
  axios
    .post("/api/auth/login", data)
    .then((res) => {
      if (res.data.token) {
        //We Got Token
        const { token } = res.data;
        //Set token to localStorage
        localStorage.setItem("jwtToken", token);
        //Set token to Auth header (we crerate it in separate file)
        setAuthToken();
        const decoded = jwt_decode(token);
        console.log("decoded", decoded);
        const dataToRedux = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          phone: decoded.phone,
        };
        dispatch(setCurrentUser(dataToRedux));
        console.log("history", history);

        history.push("/");
      } else {
        dispatch({
          type: GET_MESSAGE,
          payload: res.data,
        });
      }
      console.log("res.data", res.data);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      console.log("error :", err.response.data);
    });
};

//Set Logged User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Get User Details for Recover Account
export const getUser = (data) => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/auth/getUser", data)
    .then((res) => {
      console.log("res.data getUser", res.data);
    })
    .catch((err) => {
      console.log("error getUser", err.response.data);
    });
};

//Logout  User
export const clearOutUser = () => {
  return {
    type: CLEAR_OUT_USER,
  };
};
//Loading
export const loading = () => {
  return {
    type: LOADING_USER,
  };
};
