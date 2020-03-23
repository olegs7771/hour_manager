import axios from "axios";

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
