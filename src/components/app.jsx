import { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchAllBookmarks } from "/src/actions/bookmarks.action";

import TooltipsProvider from "/src/components/tooltips-provider";
import BookmarksBar from "/src/components/bookmarks-bar";

class App extends PureComponent {
  componentDidMount() {
    const { fetchAllBookmarks } = this.props;
    fetchAllBookmarks();
  }

  render() {
    return (
      <TooltipsProvider>
        <BookmarksBar />
      </TooltipsProvider>
    );
  }
}

export default connect(
  () => ({}),
  {
    fetchAllBookmarks: () => (dispatch) => dispatch(fetchAllBookmarks())
  }
)(App);
