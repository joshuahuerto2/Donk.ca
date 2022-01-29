import axios from "axios";
import { setAlert } from "./alert";
import {
  ERROR,
  GET_USER,
  SEND_REVIEW,
  SEND_REVIEW_FAIL,
  GET_REVIEW,
  GET_REVIEW_FAIL,
} from "./type";

import setAuthToken from "../utils/setAuthToken";

export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/users/${id}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("User not found", "error"));
    dispatch({
      type: ERROR,
    });
  }
};

export const getReviewById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/review/${id}`);
    dispatch({
      type: GET_REVIEW,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_FAIL,
      payload: "Failed",
    });
  }
};

export const senReview = ({ senderName, userId, comment, rating }) => async (
  dispatch
) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const body = JSON.stringify({ senderName, userId, comment, rating });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "http://localhost:5000/api/v1/review",
      body,
      config
    );

    dispatch({
      type: SEND_REVIEW,
      payload: res.data,
    });
    dispatch(setAlert("Review submitted", "success"));
  } catch (error) {
    dispatch(setAlert("Failed to submit review", "error"));

    dispatch({
      type: SEND_REVIEW_FAIL,
      payload: "Failed",
    });
  }
};
