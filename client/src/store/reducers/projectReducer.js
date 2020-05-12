import {
  GET_PROJECTS,
  GET_SELECTED_PROJECT,
  LOADING_PROJECT,
  GET_COORDS,
} from "../actions/types";

const initialState = {
  projects: null,
  loading: false,
  selectedProject: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case GET_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
