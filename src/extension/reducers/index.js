import { combineReducers } from "redux";

import bookmarks from "./bookmarks.reducer";
import tooltips from "./tooltips.reducer";
import bookmarkTooltips from "./bookmark-tooltips.reducer";

export default combineReducers({
  bookmarks,
  tooltips,
  bookmarkTooltips
});
