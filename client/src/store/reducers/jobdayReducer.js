import {
  GET_SELECT_DAY,
  LOADING_JOBDAY,
  JOBDAY_MESSAGE,
  GET_SELECT_MONTH
} from "../actions/types";

const initialState = {
  selectedDay: null,
  workDays: null,
  loading: false,
  message: null,
  date: null
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
        loading: false,
        message: null,
        workDays: null
      };
    case GET_SELECT_MONTH:
      return {
        ...state,
        workDays: action.payload,
        loading: false,
        selectedDay: true,
        message: null
      };
    case JOBDAY_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        date: action.payload.date,
        loading: false,
        selectedDay: null
      };

    default:
      return state;
  }
};
