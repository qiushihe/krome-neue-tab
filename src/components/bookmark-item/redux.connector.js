import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { showTooltip, hideTooltip, hideAllTooltips } from "/src/actions/tooltips.action";
import { title, type, url } from "/src/selectors/bookmarks.selector";
import { hasTooltipForBookmarkId } from "/src/selectors/tooltips.selector";
import { BOOKMARKS_BAR } from "/src/enums/bookmarks-sections";
import { FOLDER } from "/src/enums/bookmark-types";

export default connect(
  createStructuredSelector({
    title,
    type,
    url,
    hasTooltip: hasTooltipForBookmarkId
  }),
  {
    showBookmarksTooltip: ({
      targetBookmarkId,
      targetHtmlId,
      tooltipProps,
      contentComponent,
      contentComponentProps
    }) => (dispatch) => dispatch(
      showTooltip({
        targetBookmarkId,
        targetHtmlId,
        tooltipProps,
        contentComponent,
        contentComponentProps
      })
    ),
    hideTooltip: ({ targetBookmarkId }) => (dispatch) => dispatch(
      hideTooltip({ targetBookmarkId })
    ),
    hideAllTooltips: () => (dispatch) => dispatch(hideAllTooltips())
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    id: ownProps.bookmarkId,
    onClick: (evt) => {
      evt.stopPropagation();

      if (stateProps.type === FOLDER) {
        evt.preventDefault();

        if (stateProps.hasTooltip) {
          if (ownProps.atRootLevel) {
            return dispatchProps.hideTooltip({ targetBookmarkId: ownProps.bookmarkId });
          }
        } else {
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
            targetBookmarkId: ownProps.bookmarkId,
            targetHtmlId: evt.currentTarget.id,
            tooltipProps,
            contentComponent: "BookmarksTooltip",
            contentComponentProps: {
              bookmarksSection: BOOKMARKS_BAR,
              bookmarksParentId: ownProps.bookmarkId
            }
          });
        }
      } else {
        return dispatchProps.hideAllTooltips();
      }
    }
  })
);
