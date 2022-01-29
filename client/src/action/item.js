import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ITEMS,
  ERROR,
  GET_ITEM,
  SET_LOADING,
  CREAT_POST,
  SET_DONE,
  UPDATE_POST,
  GET_ITEM_BY_USER,
  NO_TIEMS,
  REMOVE_POST_FAIL,
  REMOVE_POST,
} from "./type";
import setAuthToken from "../utils/setAuthToken";

//Get list of items
export const getItems = () => async (dispatch) => {
  try {
    const res = await axios.get("./api/v1/items");
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: {
        msg: "Failed to fetch",
        status: "500",
      },
    });
  }
};

export const getItemsByUserId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/v1/items/user/${id}`
    );
    dispatch({
      type: GET_ITEM_BY_USER,
      payload: res.data,
    });
  } catch (error) {
    // dispatch(setAlert("User does not have any listing", "info"));

    dispatch({
      type: NO_TIEMS,
      payload: {
        msg: "Failed to fetch",
        status: "200",
      },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.delete(
      `http://localhost:5000/api/v1/items/${id}`,
      config
    );
    dispatch({
      type: REMOVE_POST,
      payload: "DONE",
    });
    dispatch(setAlert("Post removed", "success"));
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Failed to delete post", "error"));
    dispatch({
      type: REMOVE_POST_FAIL,
      payload: {
        msg: "Failed to REMOVE",
        status: "403",
      },
    });
  }
};

export const updatePost = ({
  name,
  description,
  category,
  price,
  location,
  photos,
  id,
}) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    let image = [];
    const formData = new FormData();
    if (photos.length !== 0) {
      photos.map((i) => {
        formData.append("images", i);
      });
      const res = await axios.post(
        "http://localhost:5000/api/v1/items/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      image = res.data.data;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      description,
      category,
      price,
      location,
      photos: image,
    });

    const res2 = await axios.put(
      `http://localhost:5000/api/v1/items/${id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_POST,
      payload: res2.data,
    });

    dispatch(setAlert("Post successful updated", "success"));
  } catch (error) {
    dispatch(setAlert("Failed to update post", "error"));
    dispatch({
      type: ERROR,
      payload: {
        msg: "Failed to fetch",
        status: "500",
      },
    });
  }
};

//Create post
export const createPost = ({
  name,
  description,
  category,
  price,
  location,
  photos,
}) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const formData = new FormData();
    photos.map((i) => {
      formData.append("images", i);
    });
    const res = await axios.post(
      "http://localhost:5000/api/v1/items/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const resImage = res.data.data;

    const body = JSON.stringify({
      name,
      description,
      category,
      price,
      location,
      photos: resImage,
    });

    const res2 = await axios.post(
      "http://localhost:5000/api/v1/items",
      body,
      config
    );

    dispatch({
      type: CREAT_POST,
      payload: res2.data,
    });

    dispatch(setAlert("Post successful created", "success"));
  } catch (error) {
    dispatch(setAlert("Failed to creat post", "error"));
    dispatch({
      type: ERROR,
      payload: {
        msg: "Failed to fetch",
        status: "500",
      },
    });
  }
};

//Get an item
export const getItem = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/items/${id}`);
    dispatch({
      type: GET_ITEM,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: {
        msg: "Failed to fetch",
        status: "500",
      },
    });
  }
};

//Set loader
export const setLoader = (flag) => (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: flag,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: {
        msg: "Failed to fetch",
        status: "500",
      },
    });
  }
};

export const setDone = (flag) => (dispatch) => {
  try {
    dispatch({
      type: SET_DONE,
      payload: flag,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: {
        msg: "Failed to fetch",
        status: "500",
      },
    });
  }
};
