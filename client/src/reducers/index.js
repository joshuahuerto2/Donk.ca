import { combineReducers } from "redux";
import test from "./test";
import alert from "./alert";
import item from "./item";
import auth from "./auth";
import user from "./user";

export default combineReducers({
  test,
  alert,
  item,
  auth,
  user,
});
