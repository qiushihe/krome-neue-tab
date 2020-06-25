import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import values from "lodash/fp/values";
import sortBy from "lodash/fp/sortBy";
import isUndefined from "lodash/fp/isUndefined";
import isEmpty from "lodash/fp/isEmpty";
import compact from "lodash/fp/compact";
import map from "lodash/fp/map";
import get from "lodash/fp/get";

import { getProp } from "/src/extension/selectors/selector.helper";

import { bookmarks as bookmarksState } from "./root.selector";

export const allBookmarks = createSelector(
  bookmarksState,
  values
);

export const bookmarks = createSelector(
  getProp("bookmarksSection"),
  getProp("bookmarksParentId"),
  allBookmarks,
  (bookmarksSection, bookmarksParentId, bookmarks) => {
    const filters = {};

    if (!isUndefined(bookmarksSection)) {
      filters.section = bookmarksSection;
    }

    if (!isUndefined(bookmarksParentId)) {
      filters.parentId = bookmarksParentId;
    }

    return flow(compact([
      isEmpty(filters) ? null : filter(filters),
      sortBy("index")
    ]))(bookmarks);
  }
);

export const bookmarkIds = createSelector(
  bookmarks,
  map(get("id"))
);

export const bookmark = createSelector(
  getProp("bookmarkId"),
  bookmarksState,
  (bookmarkId, allBookmarks) => {
    return get(bookmarkId)(allBookmarks);
  }
);

export const title = createSelector(
  bookmark,
  get("title")
);

export const type = createSelector(
  bookmark,
  get("type")
);

export const url = createSelector(
  bookmark,
  get("url")
);

export const parentId = createSelector(
  bookmark,
  get("parentId")
);
