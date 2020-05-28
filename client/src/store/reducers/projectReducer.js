import {
  GET_PROJECTS,
  GET_SELECTED_PROJECT,
  LOADING_PROJECT,
  SELECT_COORDINATES,
} from "../actions/types";

const initialState = {
  projects: null,
  loading: false,
  selectedProject: null,
  selectedCoords: null,
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
    case SELECT_COORDINATES:
      return {
        ...state,
        selectedCoords: action.payload,
      };

    default:
      return state;
  }
};
