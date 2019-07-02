import { PureComponent, Children } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { BookmarksTooltipItem } from "/src/extension/components/bookmark-item";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #d2d2d2;
  border-radius: 6px;
  box-shadow: 0px 4px 8px 0px #0003;
  padding: 4px 0;
  min-width: 100px;
  max-width: 400px;
`;

class BookmarksTooltip extends PureComponent {
  renderBookmarks() {
    const { bookmarkIds } = this.props;

    return flow([
      map((bookmarkId) => {
        return (
          <BookmarksTooltipItem bookmarkId={bookmarkId} />
        );
      }),
      Children.toArray
    ])(bookmarkIds);
  }

  render() {
    return (
      <Base>
        {this.renderBookmarks()}
      </Base>
    );
  }
}

BookmarksTooltip.propTypes = {
  bookmarkIds: PropTypes.array
};

BookmarksTooltip.defaultProps = {
  bookmarkIds: []
};

export default BookmarksTooltip;
