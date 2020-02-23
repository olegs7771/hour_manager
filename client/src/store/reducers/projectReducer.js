import { GET_PROJECTS, CREATE_PROJECT } from "../actions/types";

const initialState = {
  projects: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: state.unshift(action.payload)
      };

    default:
      return state;
  }
};
