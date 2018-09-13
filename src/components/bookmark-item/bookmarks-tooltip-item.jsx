import { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import get from "lodash/fp/get";

import { FOLDER } from "/src/enums/bookmark-types";
import fileIcon from "/src/images/icon-file.png";
import folderIcon from "/src/images/icon-folder.png";

const Base = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 6px 18px 6px 24px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #e8eaed;
  }
`;

const Icon = styled.div`
  padding-right: 6px;
`;

const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
`;

class BookmarksTooltipItem extends PureComponent {
  render() {
    const {
      id,
      title,
      type,
      url,
      onClick,
      onMouseOver,
      onMouseOut
    } = this.props;

    const hoverEventHandlers = type === FOLDER ? {
      onMouseOver,
      onMouseOut
    } : {};

    return (
      <Base
        id={`bookmarks-tooltip-item-${id}`}
        href={url}
        onClick={onClick}
        {...hoverEventHandlers}
      >
        <Icon>
          <img src={type === FOLDER ? folderIcon : fileIcon} width={16} height={16} />
        </Icon>
        <Label>
          {title}
        </Label>
      </Base>
    );
  }
}

BookmarksTooltipItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};

BookmarksTooltipItem.defaultProps = {
  id: "",
  title: "",
  type: "",
  url: "",
  onClick: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {}
};

export default BookmarksTooltipItem;
