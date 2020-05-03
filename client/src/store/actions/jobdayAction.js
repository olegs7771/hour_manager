import {
  GET_SELECT_DAY,
  LOADING_JOBDAY,
  JOBDAY_MESSAGE,
  GET_SELECT_MONTH,
  GET_ERRORS,
} from "./types";
import axios from "axios";

export const selectDay = (data) => (dispatch) => {
  console.log("data day select day", data);
  dispatch(loading());
  axios.post("/api/jobday/get_jobday", data).then((res) => {
    console.log("res.data", res.data);
    if (res.data.message) {
      dispatch({
        type: JOBDAY_MESSAGE,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SELECT_DAY,
        payload: res.data,
      });
    }
  });
};

//Get Selected Month
export const selectMonth = (data) => (dispatch) => {
  // console.log("data month", data);
  dispatch(loading());
  axios
    .post("/api/jobday/jobdays_month", data)
    .then((res) => {
      console.log("res.data in jobdays_month ", res.data);
      if (res.data.message) {
        return dispatch({
          type: JOBDAY_MESSAGE,
          payload: res.data,
        });
      }
      dispatch({
        type: GET_SELECT_MONTH,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err:", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Manager Confirms after Employee confirmation
export const managerConfirm = (data) => (dispatch) => {
  console.log("data managerConfirm", data);

  dispatch(loading());
  axios.post("/api/jobday/manager_confirm", data).then((res) => {
    console.log("res.data manager_confirm", res.data);
    dispatch({
      type: GET_SELECT_DAY,
      payload: res.data,
    });
  });
};
//Manager Decided to Cancel Confirmation
export const managerCancelConfirm = (data) => (dispatch) => {
  console.log("data managerConfirm cancel", data);

  dispatch(loading());
  axios.post("/api/jobday/manager_confirm_cancel", data).then((res) => {
    console.log("res.data manager_confirm_cancel", res.data);
    dispatch({
      type: GET_SELECT_DAY,
      payload: res.data,
    });
  });
};

export const loading = () => {
  return {
    type: LOADING_JOBDAY,
  };
};
