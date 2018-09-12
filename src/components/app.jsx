import { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchAllBookmarks } from "/src/actions/bookmarks.action";

import BookmarksBar from "/src/components/bookmarks-bar";

class App extends PureComponent {
  componentDidMount() {
    const { fetchAllBookmarks } = this.props;
    fetchAllBookmarks();
  }

  render() {
    return (
      <div>
        <BookmarksBar />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {
    fetchAllBookmarks: () => (dispatch) => dispatch(fetchAllBookmarks())
  }
)(App);
