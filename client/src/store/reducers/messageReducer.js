import { GET_MESSAGE, LOADING } from "../actions/types";

const initialState = {
  messages: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MESSAGE:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
