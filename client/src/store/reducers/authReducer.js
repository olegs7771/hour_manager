import { REGISTER_USER, SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
