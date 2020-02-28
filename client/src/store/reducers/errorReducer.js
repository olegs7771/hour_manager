import { GET_ERRORS, LOADING } from "../actions/types";

const initialState = {
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};
