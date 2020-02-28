import { GET_ALL_EMPLOYEES, LOADING } from "../actions/types";

const initialState = {
  employess: [],
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
    default:
      return state;
  }
};
