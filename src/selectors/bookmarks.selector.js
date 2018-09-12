import { createSelector } from "reselect";
import get from "lodash/fp/get";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import values from "lodash/fp/values";
import sortBy from "lodash/fp/sortBy";

import { bookmarks as getAllBookmarks } from "./root.selector";

const getProp = (propName) => (_, props) => get(propName)(props);

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