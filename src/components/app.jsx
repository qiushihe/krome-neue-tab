import { PureComponent } from "react";
import { connect } from 'react-redux';

import { fetchAllBookmarks } from "/src/actions/bookmarks.action";

class App extends PureComponent {
  componentDidMount() {
    const { fetchAllBookmarks } = this.props;
    fetchAllBookmarks();
  }

  render() {
    return (
      <div>IT WORKED!!!</div>
    );
  }
}

export default connect(
  () => ({}),
  {
    fetchAllBookmarks: () => (dispatch) => dispatch(fetchAllBookmarks())
  }
)(App);
