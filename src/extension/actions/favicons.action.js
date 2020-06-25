import { createAction } from "redux-actions";

export const SET_BOOKMARK_FAVICON_SRC = "SET_BOOKMARK_FAVICON_SRC";

export const setBookmarkFaviconSrc = createAction(
  SET_BOOKMARK_FAVICON_SRC,
  ({ origin, faviconSrc }) => ({ origin, faviconSrc })
);
