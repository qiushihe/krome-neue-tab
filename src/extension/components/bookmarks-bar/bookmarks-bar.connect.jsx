import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { bookmarkIds as getBookmarkIds } from "/src/selectors/bookmarks.selector";
import { withExtraProps } from "/src/helpers/selector.helpers";
import { BOOKMARKS_BAR } from "/src/enums/bookmarks-sections";

import BookmarksBar from "./bookmarks-bar";

export default connect(
  createStructuredSelector({
    bookmarkIds: withExtraProps(getBookmarkIds, {
      bookmarksSection: BOOKMARKS_BAR,
      bookmarksParentId: null
    })
  })
)(BookmarksBar);
