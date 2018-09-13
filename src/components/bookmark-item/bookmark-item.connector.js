import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { title, type, url } from "/src/selectors/bookmarks.selector";
import { showTooltip } from "/src/actions/tooltips.action";
import { BOOKMARKS_BAR } from "/src/enums/bookmarks-sections";
import { FOLDER } from "/src/enums/bookmark-types";

export default connect(
  createStructuredSelector({
    title,
    type,
    url
  }),
  {
    showBookmarksTooltip: ({
      targetHtmlId,
      tooltipProps,
      contentComponent,
      contentComponentProps
    }) => (dispatch) => dispatch(
      showTooltip({
        targetHtmlId,
        tooltipProps,
        contentComponent,
        contentComponentProps
      })
    )
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    id: ownProps.bookmarkId,
    onClick: (evt) => {
      if (stateProps.type === FOLDER) {
        evt.preventDefault();

        const tooltipProps = { topDisabled: true };

        if (ownProps.atRootLevel) {
          tooltipProps.leftDisabled = true;
          tooltipProps.rightDisabled = true;
          tooltipProps.region = "bottom";
        } else {
          tooltipProps.bottomDisabled = true;
          tooltipProps.region = "right";
        }

        return dispatchProps.showBookmarksTooltip({
          targetHtmlId: evt.currentTarget.id,
          tooltipProps,
          contentComponent: "BookmarksTooltip",
          contentComponentProps: {
            bookmarksSection: BOOKMARKS_BAR,
            bookmarksParentId: ownProps.bookmarkId
          }
        });
      }
    }
  })
);
