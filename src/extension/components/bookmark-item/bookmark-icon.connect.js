import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { faviconSrc } from "/src/extension/selectors/favicons.selector";

import BookmarkIcon from "./bookmark-icon";

export default connect(
  createStructuredSelector({
    faviconSrc
  })
)(BookmarkIcon);
