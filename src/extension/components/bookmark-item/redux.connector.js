import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import flow from "lodash/fp/flow";

import { title, type, url } from "/src/extension/selectors/bookmarks.selector";

import {
  Context as BookmarkTooltipsProviderContext
} from "/src/extension/components/bookmark-tooltips-provider";

const withBookmarkTooltipsProviderContext = (Komponent) => (props) => {
  const { bookmarkId } = props;

  return (
    <BookmarkTooltipsProviderContext.Consumer>
      {({
        onClickBookmark,
        onMouseEnterBookmark,
        onMouseLeaveBookmark
      }) => {
        return (
          <Komponent
            {...props}
            onClick={(evt) => onClickBookmark(evt, { bookmarkId })}
            onMouseEnter={(evt) => onMouseEnterBookmark(evt, { bookmarkId })}
            onMouseLeave={(evt) => onMouseLeaveBookmark(evt, { bookmarkId })}
          />
        );
      }}
    </BookmarkTooltipsProviderContext.Consumer>
  );
};

const withRedux = connect(
  createStructuredSelector({
    id: (_, { bookmarkId }) => bookmarkId,
    title,
    type,
    url
  })
);

export default flow([
  withBookmarkTooltipsProviderContext,
  withRedux
]);
