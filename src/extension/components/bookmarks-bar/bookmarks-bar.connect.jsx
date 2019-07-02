import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { bookmarkIds as getBookmarkIds } from "/src/extension/selectors/bookmarks.selector";
import { BOOKMARKS_BAR } from "/src/extension/enums/bookmarks-sections";
import { withExtraProps } from "/src/extension/selectors/selector.helper";

import BookmarksBar from "./bookmarks-bar";

export default connect(
  createStructuredSelector({
    bookmarkIds: withExtraProps(getBookmarkIds, {
      bookmarksSection: BOOKMARKS_BAR,
      bookmarksParentId: null
    })
  })
)(BookmarksBar);
