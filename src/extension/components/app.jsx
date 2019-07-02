import { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchAllBookmarks } from "/src/extension/actions/bookmarks.action";

import BookmarkTooltipsProvider from "/src/extension/components/bookmark-tooltips-provider";
import BookmarksBar from "/src/extension/components/bookmarks-bar";

class App extends PureComponent {
  componentDidMount() {
    const { fetchAllBookmarks } = this.props;
    fetchAllBookmarks();
  }

  render() {
    return (
      <BookmarkTooltipsProvider>
        <BookmarksBar />
      </BookmarkTooltipsProvider>
    );
  }
}

export default connect(
  () => ({}),
  {
    fetchAllBookmarks: () => (dispatch) => dispatch(fetchAllBookmarks())
  }
)(App);
