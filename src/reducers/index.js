import { combineReducers } from "redux";

import bookmarks from "./bookmarks.reducer";
import tooltips from "./tooltips.reducer";

const combinedReducer = combineReducers({
  bookmarks,
  tooltips
});

export default (state = {}, action) => {
  console.log("------------------------------------");
  console.log("state", state);
  console.log("action", action);
  const newState = combinedReducer(state, action);
  console.log("newState", newState);
  return newState;
};
