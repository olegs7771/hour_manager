import {
  SET_CURRENT_USER,
  CLEAR_OUT_USER,
  GET_ERRORS,
  GET_MESSAGE,
  LOADING_USER,
  CONFIRMED_USER,
  GET_USER_DETAILS,
  GET_STATUS_EMAIL,
  SECRET_CHECK,
  CLEAR_ERRORS,
  STOP_LOADING,
  CODE_MATCH,
  GET_USER_DATA,
} from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Registration new user

export const registerUser = (data) => (dispatch) => {
  dispatch(loading());
  console.log("data", data);
  axios
    .post("/api/auth/register", data)
    .then((res) => {
      console.log("res.data register", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
      dispatch({
        type: GET_USER_DATA,
        payload: res.data.payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: STOP_LOADING,
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
        type: GET_STATUS_EMAIL,
        payload: res.data,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      console.log("error testing email if exists", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: GET_STATUS_EMAIL,
        payload: { status: false },
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
          date: decoded.date,
          projects: decoded.projects,
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
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error getUser", err.response.data);
    });
};

//Recover Password by Secret Questin/Answer
//Returns true/false
//If true then user can choose new password
export const checkSecretPair = (data) => (dispatch) => {
  dispatch(loading());
  console.log("data checkSecretPair", data);
  axios
    .post("/api/auth/secret_question", data)
    .then((res) => {
      console.log("res.data checkSecretPair", res.data);
      dispatch({
        type: SECRET_CHECK,
        payload: res.data.secretCheck,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      console.log("error checkSecretPair", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: SECRET_CHECK,
        payload: false,
      });
    });
};

//Creating New Password
export const newPassword = (data) => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/auth/new_password", data)
    .then((res) => {
      console.log("res.data new_password", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    })
    .catch((err) => {
      console.log("error new_password", err.response.data);
    });
};

//Send Request to API for SMS
export const sendSMS = (data) => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/auth/sendSMS", data)
    .then((res) => {
      console.log("res.data sendSMS", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    })
    .catch((err) => {
      console.log("error sendSMS", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Match Code Recieved by SMS
export const matchCode = (data) => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/auth/match_code", data)
    .then((res) => {
      console.log("res.data sendSMS", res.data);
      dispatch({
        type: CODE_MATCH,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
      dispatch({
        type: GET_MESSAGE,
        payload: {},
      });
    })
    .catch((err) => {
      console.log("error sendSMS", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Editing User Details
export const editUser = (data) => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/auth/edit_user", data)
    .then((res) => {
      console.log("res.data editUset");
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    })
    .catch((err) => {
      console.log("error editUser", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    });
};

//Delete User
export const deleteUser = (data) => (dispatch) => {
  dispatch(loading());
  axios
    .post("/api/auth/delete_user", data)
    .then((res) => {
      console.log("res.data deleteUser", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    })
    .catch((err) => {
      console.log("error to delete user ", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
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
