import { PureComponent, Children } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { BookmarksBarItem } from "/src/components/bookmark-item";

const Base = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 6px;
`;

const RootLevelItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

class BookmarksBar extends PureComponent {
  renderBookmarks() {
    const { bookmarkIds } = this.props;

    return flow([
      map((bookmarkId) => {
        return (
          <BookmarksBarItem atRootLevel={true} bookmarkId={bookmarkId} />
        );
      }),
      Children.toArray
    ])(bookmarkIds);
  }

  render() {
    return (
      <Base>
        <RootLevelItems>
          {this.renderBookmarks()}
        </RootLevelItems>
      </Base>
    );
  }
}

BookmarksBar.propTypes = {
  bookmarkIds: PropTypes.array
};

BookmarksBar.defaultProps = {
  bookmarkIds: []
};

export default BookmarksBar;
