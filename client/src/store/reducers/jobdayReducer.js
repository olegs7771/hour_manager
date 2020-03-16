import {
  GET_SELECT_DAY,
  GET_SELECT_MONTH,
  LOADING_JOBDAY,
  JOBDAY_MESSAGE
} from "../actions/types";

const initialState = {
  selectedDay: null,
  workDays: null,
  loading: false,
  message: null,
  date: null,
  hoursLimit: {}
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
        workDays: action.payload.days,
        hoursLimit: action.payload.hours,
        loading: false,
        selectedDay: true,
        message: null
      };
    case GET_SELECT_MONTH:
      return {
        ...state,
        workDays: action.payload,
        loading: false
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
