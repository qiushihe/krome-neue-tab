import connector from "./bookmark-item.connector";

import PlainBookmarksBarItem from "./bookmarks-bar-item";
import PlainBookmarksTooltipItem from "./bookmarks-tooltip-item";

export const BookmarksBarItem = connector(PlainBookmarksBarItem);
export const BookmarksTooltipItem = connector(PlainBookmarksTooltipItem);
