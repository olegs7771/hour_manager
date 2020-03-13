import { GET_SELECT_DAY } from "../actions/types";

const initialState = {
  selectedDay: null,
  workDays: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECT_DAY:
      return {
        ...state,
        selectedDay: action.payload
      };

    default:
      return state;
  }
};
