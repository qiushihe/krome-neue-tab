import { PureComponent, Children } from "react";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { FOLDER } from "/src/enums/bookmark-types";
import Item from "./item";

const renderBookmarks = flow([
  map((bookmark) => {
    console.log("renderBookmarks", bookmark);

    return (
      <Item
        title={bookmark.title}
        isFolder={bookmark.type === FOLDER}
      />
    );
  }),
  Children.toArray
]);

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
  render() {
    const { bookmarks } = this.props;

    return (
      <Base>
        <RootLevelItems>
          {renderBookmarks(bookmarks)}
        </RootLevelItems>
      </Base>
    );
  }
}

export default BookmarksBar;
