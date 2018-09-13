import { PureComponent, Children } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { FOLDER } from "/src/enums/bookmark-types";
import Item from "./item";

const Base = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #e8e8e8;
`;

const RootLevelItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

class BookmarksBar extends PureComponent {
  renderBookmarks() {
    const { bookmarks, showFolderContent } = this.props;

    return flow([
      map((bookmark) => {
        return (
          <Item
            id={bookmark.id}
            title={bookmark.title}
            isFolder={bookmark.type === FOLDER}
          />
        );
      }),
      Children.toArray
    ])(bookmarks);
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
  bookmarks: PropTypes.array
};

BookmarksBar.defaultProps = {
  bookmarks: []
};

export default BookmarksBar;
