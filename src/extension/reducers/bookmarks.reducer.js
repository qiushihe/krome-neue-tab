import { handleActions } from "redux-actions";

import {
  PARSE_BOOKMARKS_TREE,
  SET_BOOKMARK_FAVICON_SRC
} from "/src/extension/actions/bookmarks.action";

import parseBookmarksTree from "./bookmarks/parse-bookmarks-tree";
import setBookmarkFaviconSrc from "./favicons/set-bookmark-favicon-src";

const initialState = {};

export default handleActions({
  [PARSE_BOOKMARKS_TREE]: parseBookmarksTree,
  [SET_BOOKMARK_FAVICON_SRC]: setBookmarkFaviconSrc
}, initialState);
