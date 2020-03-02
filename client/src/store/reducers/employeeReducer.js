import {
  GET_ALL_EMPLOYEES,
  LOADING,
  GET_SELECTED_EMPLOYEE
} from "../actions/types";

const initialState = {
  employees: [],
  loading: false,
  selectedEmployee: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
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
    case GET_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
