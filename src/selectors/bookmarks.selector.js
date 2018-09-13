import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import values from "lodash/fp/values";
import sortBy from "lodash/fp/sortBy";

import { getProp } from "/src/helpers/selector.helpers";

import { bookmarks as getAllBookmarks } from "./root.selector";

export const bookmarks = createSelector(
  getProp("bookmarksSection"),
  getProp("bookmarksParentId"),
  getAllBookmarks,
  (bookmarksSection, bookmarksParentId, allBookmarks) => {
    return flow([
      filter({
        section: bookmarksSection,
        parentId: bookmarksParentId
      }),
      values,
      sortBy("index")
    ])(allBookmarks);
  }
);
