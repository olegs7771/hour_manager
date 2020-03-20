import {
  SET_CURRENT_USER,
  CLEAR_OUT_USER,
  LOADING_USER,
  CONFIRMED_USER
} from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  confirmed_user: null
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
    case CONFIRMED_USER:
      return {
        ...state,
        confirmed_user: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
