import { PureComponent, Children, createContext } from "react";
import PropTypes from "prop-types";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import find from "lodash/fp/find";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import flattenDeep from "lodash/fp/flattenDeep";
import identity from "lodash/fp/identity";

import TooltipsProvider from "/src/components/tooltips-provider";
import { FOLDER } from "/src/enums/bookmark-types";
import { BOOKMARK } from "/src/enums/tooltip-target-types";
import { BOOKMARKS_BAR } from "/src/enums/bookmarks-sections";

const hasTooltipForBookmarkId = ({ tooltips, bookmarkId }) => {
  return flow([
    find({ targetType: BOOKMARK, targetId: bookmarkId }),
    negate(isEmpty)
  ])(tooltips);
};

const isBookmarkAtRootLevel = ({ bookmarks, bookmarkId }) => {
  return flow([
    find({ id: bookmarkId }),
    get("parentId"),
    isEmpty
  ])(bookmarks);
};

const getBookmarkType = ({ bookmarks, bookmarkId }) => {
  return flow([
    find({ id: bookmarkId }),
    get("type")
  ])(bookmarks);
};

export const Context = createContext({
  onClickBookmark: identity,
  onMouseEnterBookmark: identity,
  onMouseLeaveBookmark: identity
});

class BookmarkTooltipsProvider extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {};

    this.handleTooltipsProviderBaseClick = this.handleTooltipsProviderBaseClick.bind(this);
    this.handleClickBookmark = this.handleClickBookmark.bind(this);
    this.handleMouseEnterBookmark = this.handleMouseEnterBookmark.bind(this);
    this.handleMouseLeaveBookmark = this.handleMouseLeaveBookmark.bind(this);

    this.state.context = {
      onClickBookmark: this.handleClickBookmark,
      onMouseEnterBookmark: this.handleMouseEnterBookmark,
      onMouseLeaveBookmark: this.handleMouseLeaveBookmark
    };
  }

  handleTooltipsProviderBaseClick() {
    const { hasTooltips, hideAllTooltips } = this.props;

    if (hasTooltips) {
      hideAllTooltips();
    }
  }

  handleClickBookmark(evt, { bookmarkId }) {
    evt.stopPropagation();

    const {
      bookmarks,
      tooltips,
      showBookmarksTooltip,
      hideTooltip,
      hideAllTooltips
    } = this.props;

    if (getBookmarkType({ bookmarks, bookmarkId }) === FOLDER) {
      evt.preventDefault();

      if (hasTooltipForBookmarkId({ tooltips, bookmarkId })) {
        if (isBookmarkAtRootLevel({ bookmarks, bookmarkId })) {
          hideTooltip({
            targetType: BOOKMARK,
            targetId: bookmarkId
          });
        }
      } else {
        const tooltipProps = { topDisabled: true };

        if (isBookmarkAtRootLevel({ bookmarks, bookmarkId })) {
          tooltipProps.leftDisabled = true;
          tooltipProps.rightDisabled = true;
          tooltipProps.region = "bottom";
        } else {
          tooltipProps.bottomDisabled = true;
          tooltipProps.region = "right";
        }

        showBookmarksTooltip({
          targetType: BOOKMARK,
          targetId: bookmarkId,
          targetHtmlId: evt.currentTarget.id,
          tooltipProps,
          contentComponent: "BookmarksTooltip",
          contentComponentProps: {
            bookmarksSection: BOOKMARKS_BAR,
            bookmarksParentId: bookmarkId
          }
        });
      }
    } else {
      hideAllTooltips();
    }
  }

  handleMouseEnterBookmark(evt, { bookmarkId }) {
    // console.log("onMouseEnterBookmark", bookmarkId);
  }

  handleMouseLeaveBookmark(evt, { bookmarkId }) {
    // console.log("onMouseLeaveBookmark", bookmarkId);
  }

  render() {
    const { children } = this.props;

    return (
      <Context.Provider value={this.state.context}>
        <TooltipsProvider onBaseClick={this.handleTooltipsProviderBaseClick}>
          {Children.toArray(flattenDeep([children]))}
        </TooltipsProvider>
      </Context.Provider>
    );
  }
}

BookmarkTooltipsProvider.propTypes = {
  bookmarks: PropTypes.array,
  tooltips: PropTypes.array,
  hasTooltips: PropTypes.bool,
  showBookmarksTooltip: PropTypes.func,
  hideTooltip: PropTypes.func,
  hideAllTooltips: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

BookmarkTooltipsProvider.defaultProps = {
  bookmarks: [],
  tooltips: [],
  hasTooltips: false,
  showBookmarksTooltip: () => {},
  hideTooltip: () => {},
  hideAllTooltips: () => {},
  children: []
};

export default BookmarkTooltipsProvider;
