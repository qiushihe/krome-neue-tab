import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { bookmarks as getBookmarks } from "/src/selectors/bookmarks.selector";
import { withExtraProps } from "/src/helpers/selector.helpers";
import { BOOKMARKS_BAR } from "/src/enums/bookmarks-sections";

import BookmarksBar from "./bookmarks-bar";

export default connect(
  createStructuredSelector({
    bookmarks: withExtraProps(getBookmarks, {
      bookmarksSection: BOOKMARKS_BAR,
      bookmarksParentId: null
    })
  })
)(BookmarksBar);
