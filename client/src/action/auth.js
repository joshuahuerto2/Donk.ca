import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  CLEAR_PROGILE,
  LOGOUT,
} from "./type";
import setAuthToken from "../utils/setAuthToken";

export const register = ({ name, email, password, phoneNumber }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, phoneNumber });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Account created", "success"));
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Email already been use", "error"));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get("http://localhost:5000/api/v1/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const updateProfule = ({ name, phoneNumber, address, email }) => async (
  dispatch
) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const body = JSON.stringify({ name, phoneNumber, address, email });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      "http://localhost:5000/api/v1/users",
      body,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Profile updated", "success"));
  } catch (error) {
    dispatch(setAlert("Update profile failed", "error"));

    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: "Failed",
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert("Login Failed", "error"));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROGILE });
  dispatch({ type: LOGOUT });
};
