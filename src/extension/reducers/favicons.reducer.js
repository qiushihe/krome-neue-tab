import { handleActions } from "redux-actions";

import {
  SET_BOOKMARK_FAVICON_SRC
} from "/src/extension/actions/favicons.action";

import setBookmarkFaviconSrc from "./favicons/set-bookmark-favicon-src";

const initialState = {};

export default handleActions({
  [SET_BOOKMARK_FAVICON_SRC]: setBookmarkFaviconSrc
}, initialState);
