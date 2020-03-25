import axios from "axios";
import { GET_MESSAGE } from "./types";

//Admin Approves The New User Registration
export const approveReg = data => dispatch => {
  console.log("data admin approves", data);
  axios
    .post("/api/auth/admin", data)
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err.response.data", err.response.data);
    });
};

//Send Admin contact form
export const sendEmailToAdmin = data => dispatch => {
  axios.post("/api/auth/sendEmailAdmin", data).then(res => {
    console.log("res.data", res.data);
    dispatch({
      type: GET_MESSAGE,
      payload: res.data
    });
  });
};
