//Default path to Axios
// HTTP Request =>puts token to Request Header
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //config defaults that will be applied to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //if token not out there than we want to delete token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
