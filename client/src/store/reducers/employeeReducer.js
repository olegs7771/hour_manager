import { GET_ALL_EMPLOYEES, LOADING_EMPLOYEES } from "../actions/types";

const initialState = {
  employess: [],
  loading: false,
  selectedEmployee: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_EMPLOYEES:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
