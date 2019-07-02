import { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import get from "lodash/fp/get";

import { FOLDER } from "/src/extension/enums/bookmark-types";
import fileIcon from "/src/extension/images/icon-file.png";
import folderIcon from "/src/extension/images/icon-folder.png";

const Base = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 9999px;
  margin: 0 2px 0 0;
  padding: 6px 8px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #eeeeee;
  }

  &:active {
    background-color: #e2e2e2;
  }
`;

const Icon = styled.div`
  padding-right: 8px;
`;

const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
`;

class BookmarksBarItem extends PureComponent {
  render() {
    const {
      id,
      title,
      type,
      url,
      onClick,
      onMouseEnter,
      onMouseLeave
    } = this.props;

    return (
      <Base
        id={`bookmarks-bar-item-${id}`}
        href={url}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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

BookmarksBarItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

BookmarksBarItem.defaultProps = {
  id: "",
  title: "",
  type: "",
  url: "",
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export default BookmarksBarItem;
