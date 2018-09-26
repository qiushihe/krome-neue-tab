import { combineReducers } from "redux";

import bookmarks from "./bookmarks.reducer";
import tooltips from "./tooltips.reducer";
import bookmarkTooltips from "./bookmark-tooltips.reducer";

const combinedReducer = combineReducers({
  bookmarks,
  tooltips,
  bookmarkTooltips
});

export default (state = {}, action) => {
  console.log("------------------------------------");
  console.log("state", state);
  console.log("action", action);
  const newState = combinedReducer(state, action);
  console.log("newState", newState);
  return newState;
};
