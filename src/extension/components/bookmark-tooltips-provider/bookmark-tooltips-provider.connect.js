import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import find from "lodash/fp/find";

import { clickBase } from "/src/extension/actions/bookmark-tooltips.action";
import { setAllTooltips } from "/src/extension/actions/tooltips.action";
import { bookmarks } from "/src/extension/selectors/bookmarks.selector";
import { tooltips, hasTooltips } from "/src/extension/selectors/tooltips.selector";

import BookmarkTooltipsProvider from "./bookmark-tooltips-provider";

export default connect(
  createStructuredSelector({
    bookmarks,
    tooltips,
    hasTooltips
  }),
  {
    // onBaseClick: () => (dispatch) => dispatch(clickBase()),
    setAllTooltips: ({ tooltips }) => (dispatch) => dispatch(setAllTooltips({ tooltips }))
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    tooltipTrail: map(({ id, targetId }) => {
      return {
        tooltipId: id,
        bookmarkId: targetId,
        parentBookmarkId: flow([
          find({ id: targetId }),
          get("parentId")
        ])(stateProps.bookmarks)
      };
    })(stateProps.tooltips)
  })
)(BookmarkTooltipsProvider);
