import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { bookmarkIds } from "/src/selectors/bookmarks.selector";

import BookmarksTooltip from "./bookmarks-tooltip";

export default connect(
  createStructuredSelector({
    bookmarkIds
  })
)(BookmarksTooltip);
