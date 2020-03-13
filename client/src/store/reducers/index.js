import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import projectReducer from "./projectReducer";
import employeeReducer from "./employeeReducer";
import jobdayReducer from "./jobdayReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  messages: messageReducer,
  projects: projectReducer,
  employees: employeeReducer,
  jobday: jobdayReducer
});
