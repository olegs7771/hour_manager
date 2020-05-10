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
  coords: null,
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
    case GET_COORDS:
      return {
        ...state,
        coords: action.payload,
      };

    default:
      return state;
  }
};
