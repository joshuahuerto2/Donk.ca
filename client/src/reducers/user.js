import {
  ERROR,
  GET_USER,
  SEND_REVIEW,
  SEND_REVIEW_FAIL,
  GET_REVIEW,
  GET_REVIEW_FAIL,
  CLEAR_PROGILE,
} from "../action/type";

const initialState = {
  loading: true,
  userInfo: null,
  reviews: [],
  done: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_PROGILE:
      return {
        ...state,
        loading: false,
        userInfo: null,
        reviews: [],
        done: false,
      };
    case GET_REVIEW:
      return {
        ...state,
        loading: false,
        reviews: payload.data,
      };
    case GET_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SEND_REVIEW:
      return {
        ...state,
        loading: false,
        reviews: [payload.data, ...state.reviews],
        done: true,
      };
    case SEND_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        loading: false,
        userInfo: payload.data,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        userInfo: null,
      };
    default:
      return state;
  }
}
