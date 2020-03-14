import { GET_SELECT_DAY, LOADING_JOBDAY, JOBDAY_MESSAGE } from "./types";
import axios from "axios";

export const selectDay = data => dispatch => {
  console.log("data", data);
  dispatch(loading());
  axios.post("/api/jobday/get_jobday", data).then(res => {
    console.log("res.data", res.data);
    if (res.data.message) {
      dispatch({
        type: JOBDAY_MESSAGE,
        payload: res.data
      });
    } else {
      dispatch({
        type: GET_SELECT_DAY,
        payload: res.data
      });
    }
  });
};

export const loading = () => {
  return {
    type: LOADING_JOBDAY
  };
};
