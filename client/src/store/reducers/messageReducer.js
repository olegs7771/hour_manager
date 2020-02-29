import { GET_MESSAGE } from "../actions/types";

const initialState = {
  messages: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        messages: action.payload
      };

    default:
      return state;
  }
};
