import reduxConnector from "./redux.connector";

import PlainBookmarksBarItem from "./bookmarks-bar-item";
import PlainBookmarksTooltipItem from "./bookmarks-tooltip-item";

export const BookmarksBarItem = reduxConnector(PlainBookmarksBarItem);
export const BookmarksTooltipItem = reduxConnector(PlainBookmarksTooltipItem);
