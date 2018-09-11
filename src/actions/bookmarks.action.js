import { createAction } from "redux-actions";

import { getBookmarksBarSubTree } from "/src/helpers/bookmarks.helper";

export const PARSE_BOOKMARKS_TREE = "PARSE_BOOKMARKS_TREE";

export const parseBookmarksTree = createAction(
  PARSE_BOOKMARKS_TREE,
  ({ section, bookmarksTree }) => ({ section, bookmarksTree })
);

export const fetchAllBookmarks = () => (dispatch) => {
  getBookmarksBarSubTree().then((tree) => {
    dispatch(parseBookmarksTree({
      section: "BOOKMARKS_BAR",
      bookmarksTree: tree
    }));
  });
};
