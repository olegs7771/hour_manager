import {
  GET_SELECT_DAY,
  GET_SELECT_MONTH,
  LOADING_JOBDAY,
  JOBDAY_MESSAGE,
  PICK_DATE,
} from "../actions/types";

const initialState = {
  selectedDay: null,
  workDays: null,
  loading: false,
  message: null,
  date: null,
  hoursLimit: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_JOBDAY:
      return {
        ...state,
        loading: true,
      };
    case GET_SELECT_DAY:
      return {
        ...state,
        selectedDay: action.payload.day,
        loading: false,
        message: null,
        workDays: null,
        hoursLimit: action.payload.hours,
      };
    case GET_SELECT_MONTH:
      return {
        ...state,
        workDays: action.payload.selectedDays,
        hoursLimit: action.payload.hours,
        loading: false,
        selectedDay: true,
        message: null,
      };

    case JOBDAY_MESSAGE:
      return {
        ...state,
        message: action.payload,
        date: action.payload.date,
        loading: false,
        selectedDay: null,
      };

    case PICK_DATE:
      return {
        ...state,
        date: action.payload,
      };

    default:
      return state;
  }
};
