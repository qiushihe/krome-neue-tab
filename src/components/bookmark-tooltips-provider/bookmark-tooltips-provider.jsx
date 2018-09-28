import { PureComponent, Children, createContext } from "react";
import PropTypes from "prop-types";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map, { convert as convertMap } from "lodash/fp/map";
import find from "lodash/fp/find";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import flattenDeep from "lodash/fp/flattenDeep";
import identity from "lodash/fp/identity";

import TooltipsProvider from "/src/components/tooltips-provider";
import { FOLDER } from "/src/enums/bookmark-types";
import { BOOKMARK } from "/src/enums/tooltip-target-types";
import { BOOKMARKS_BAR } from "/src/enums/bookmarks-sections";

const uncappedMap = convertMap({ cap: false });
const isNotEmpty = negate(isEmpty);

const hasTooltipForBookmarkId = ({ tooltips, bookmarkId }) => {
  return flow([
    find({ targetType: BOOKMARK, targetId: bookmarkId }),
    isNotEmpty
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
    const { hasTooltips } = this.props;

    if (hasTooltips) {
      this.setTooltipTrail([]);
    }
  }

  handleClickBookmark(evt, { bookmarkId }) {
    evt.stopPropagation();

    const { bookmarks, tooltips } = this.props;

    if (getBookmarkType({ bookmarks, bookmarkId }) === FOLDER) {
      evt.preventDefault();

      if (hasTooltipForBookmarkId({ tooltips, bookmarkId })) {
        if (isBookmarkAtRootLevel({ bookmarks, bookmarkId })) {
          this.setTooltipTrail([]);
        }
      } else {
        this.setTooltipTrail([
          ...map(({ id }) => ({ tooltipId: id }))(tooltips),
          { bookmarkId, targetHtmlId: evt.currentTarget.id }
        ]);
      }
    } else {
      this.setTooltipTrail([]);
    }
  }

  handleMouseEnterBookmark(evt, { bookmarkId }) {
    const { tooltips, bookmarks } = this.props;

    if (
      // If we're currently showing some tooltips ...
      isNotEmpty(tooltips) &&
      // ... AND if the mouse enters a root level bookmark ...
      isBookmarkAtRootLevel({ bookmarks, bookmarkId }) &&
      // ... AND if that bookmark is a folder ...
      getBookmarkType({ bookmarks, bookmarkId }) === FOLDER &&
      // ... AND if that bookmark doesn't have a tooltip for it ...
      !hasTooltipForBookmarkId({ tooltips, bookmarkId })
    ) {
      // ... then hide all shown tooltip and open a tooltip for the one the mouse just entered.
      this.setTooltipTrail([{
        bookmarkId,
        targetHtmlId: evt.currentTarget.id
      }]);
    } else if (
      // If the mouse enters a non-root level bookmark ...
      !isBookmarkAtRootLevel({ bookmarks, bookmarkId }) &&
      // ... AND if that bookmark is a folder ...
      getBookmarkType({ bookmarks, bookmarkId }) === FOLDER &&
      // ... AND if that bookmark doesn't have a tooltip for it ...
      !hasTooltipForBookmarkId({ tooltips, bookmarkId })
    ) {
      // console.log("OPEN after a wait", bookmarkId);
    } else {
      // console.log("handleMouseEnterBookmark", bookmarkId);
    }
  }

  handleMouseLeaveBookmark(evt, { bookmarkId }) {
    // console.log("onMouseLeaveBookmark", bookmarkId);
  }

  setTooltipTrail(tooltips) {
    const { setAllTooltips } = this.props;

    setAllTooltips({
      tooltips: uncappedMap(({ tooltipId, bookmarkId, targetHtmlId }, tooltipIndex) => {
        if (tooltipId) {
          return { tooltipId };
        } else {
          const tooltipProps = { align: "start", topDisabled: true };

          if (tooltipIndex <= 0) {
            tooltipProps.leftDisabled = true;
            tooltipProps.rightDisabled = true;
            tooltipProps.region = "bottom";
          } else {
            tooltipProps.bottomDisabled = true;
            tooltipProps.region = "right";
          }

          return {
            index: tooltipIndex,
            targetType: BOOKMARK,
            targetId: bookmarkId,
            targetHtmlId,
            tooltipProps,
            contentComponent: "BookmarksTooltip",
            contentComponentProps: {
              bookmarksSection: BOOKMARKS_BAR,
              bookmarksParentId: bookmarkId
            }
          };
        }
      })(tooltips)
    });
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
  setAllTooltips: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

BookmarkTooltipsProvider.defaultProps = {
  bookmarks: [],
  tooltips: [],
  hasTooltips: false,
  setAllTooltips: () => {},
  children: []
};

export default BookmarkTooltipsProvider;
