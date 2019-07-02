import { createAction } from "redux-actions";

import { FIREFOX } from "/src/extension/enums/bookmarks-sources";
import { BOOKMARKS_BAR } from "/src/extension/enums/bookmarks-sections";
import { getBookmarksBarSubTree } from "/src/helpers/bookmarks.helper";

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
