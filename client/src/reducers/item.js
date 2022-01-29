import {
  ERROR,
  GET_ITEMS,
  GET_ITEM,
  SET_LOADING,
  CREAT_POST,
  SET_DONE,
  UPDATE_POST,
  GET_ITEM_BY_USER,
  NO_TIEMS,
  REMOVE_POST_FAIL,
  REMOVE_POST,
} from "../action/type";

const initialState = {
  items: [],
  loading: true,
  error: {},
  user: {},
  item: {},
  photo: [],
  done: false,
  userItems: [],
  removeStatus: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REMOVE_POST:
      return {
        ...state,
        removeStatus: true,
        loading: false,
      };
    case REMOVE_POST_FAIL:
      return {
        ...state,
        loading: false,
      };
    case NO_TIEMS:
      return {
        ...state,
        userItems: [],
        loading: false,
        done: true,
      };
    case GET_ITEM_BY_USER:
      return {
        ...state,
        userItems: payload.data,
        loading: false,
        done: true,
      };
    case CREAT_POST:
      return {
        ...state,
        items: [payload.data, ...state.items],
        loading: false,
        done: true,
      };
    case UPDATE_POST:
      return {
        ...state,
        item: payload.data,
        loading: false,
        done: true,
      };
    case SET_DONE:
      return {
        ...state,
        done: payload,
      };
    case GET_ITEMS:
      return {
        ...state,
        items: payload.data,
        loading: false,
      };
    case GET_ITEM:
      const image = payload.data.photos;
      const imageObject = [];

      image.map((item) => {
        console.log(item);
        imageObject.push({
          original: item,
          thumbnail: item,
        });
      });
      console.log(imageObject);
      return {
        ...state,
        item: payload.data,
        user: payload.user,
        photo: imageObject,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        userItems: [],
      };
    default:
      return state;
  }
}
