import { createAction } from "redux-actions";

import { getBookmarksBarSubTree } from "/src/helpers/bookmarks.helper";
import { FIREFOX } from "/src/enums/bookmarks-sources";
import { BOOKMARKS_BAR } from "/src/enums/bookmarks-sections";

export const PARSE_BOOKMARKS_TREE = "PARSE_BOOKMARKS_TREE";

export const parseBookmarksTree = createAction(
  PARSE_BOOKMARKS_TREE,
  ({ section, bookmarks }) => ({ section, bookmarks })
);

export const fetchAllBookmarks = () => (dispatch) => {
  getBookmarksBarSubTree().then((tree) => {
    dispatch(parseBookmarksTree({
      source: FIREFOX,
      section: BOOKMARKS_BAR,
      bookmarks: tree
    }));
  });
};
