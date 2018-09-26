import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { clickBase } from "/src/actions/bookmark-tooltips.action";
import { showTooltip, hideTooltip, hideAllTooltips } from "/src/actions/tooltips.action";
import { bookmarks } from "/src/selectors/bookmarks.selector";
import { tooltips, hasTooltips } from "/src/selectors/tooltips.selector";

import BookmarkTooltipsProvider from "./bookmark-tooltips-provider";

export default connect(
  createStructuredSelector({
    bookmarks,
    tooltips,
    hasTooltips
  }),
  {
    // onBaseClick: () => (dispatch) => dispatch(clickBase()),
    showBookmarksTooltip: ({
      targetType,
      targetId,
      targetHtmlId,
      tooltipProps,
      contentComponent,
      contentComponentProps
    }) => (dispatch) => dispatch(
      showTooltip({
        targetType,
        targetId,
        targetHtmlId,
        tooltipProps,
        contentComponent,
        contentComponentProps
      })
    ),
    hideTooltip: ({ targetType, targetId }) => (dispatch) => dispatch(
      hideTooltip({ targetType, targetId })
    ),
    hideAllTooltips: () => (dispatch) => dispatch(hideAllTooltips())
  }
)(BookmarkTooltipsProvider);
