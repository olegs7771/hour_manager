import {
  SET_CURRENT_USER,
  CLEAR_OUT_USER,
  LOADING_USER,
  CONFIRMED_USER,
  GET_USER_DETAILS,
  GET_STATUS_EMAIL,
  SECRET_CHECK,
  STOP_LOADING,
  CODE_MATCH,
  GET_USER_DATA,
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  // account recovery
  confirmed_user: null,
  status: false,
  secretCheck: false,
  codeStatus: false,
  //For Registration to show success message with new user's data
  userData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case CLEAR_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case CONFIRMED_USER:
      return {
        ...state,
        confirmed_user: action.payload,
        loading: false,
      };
    case GET_STATUS_EMAIL:
      return {
        ...state,
        status: action.payload.status,
        loading: false,
      };
    case GET_USER_DETAILS: //for recovery
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SECRET_CHECK: //for recovery
      return {
        ...state,
        secretCheck: action.payload,
        loading: false,
      };
    case CODE_MATCH: //for recovery
      return {
        ...state,
        codeStatus: action.payload,
        loading: false,
      };
    case STOP_LOADING: //for recovery
      return {
        ...state,
        loading: false,
      };
    case GET_USER_DATA: //for registartion
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
