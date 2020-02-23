import {
  GET_PROJECTS,
  CREATE_PROJECT,
  LOADING_PROJECT
} from "../actions/types";

const initialState = {
  projects: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PROJECT:
      return {
        ...state,
        loading: true
      };
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
