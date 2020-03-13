import { GET_SELECT_DAY } from "./types";
import axios from "axios";
export const selectDay = data => dispath => {
  console.log("data", data);
  axios.post("/api/jobday/get_jobday", data).then(res => {
    console.log("res.data", res.data);
  });
};
