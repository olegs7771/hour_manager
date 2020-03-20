import {
  SET_CURRENT_USER,
  CLEAR_OUT_USER,
  LOADING_USER
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case CLEAR_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    default:
      return state;
  }
};
