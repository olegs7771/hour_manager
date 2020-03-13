import { GET_SELECT_DAY, LOADING_JOBDAY } from "../actions/types";

const initialState = {
  selectedDay: null,
  workDays: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_JOBDAY:
      return {
        ...state,
        loading: true
      };
    case GET_SELECT_DAY:
      return {
        ...state,
        selectedDay: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
