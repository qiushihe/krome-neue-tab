import { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {getUrlOrigin} from "/src/helpers/urls.helper";

import BookmarkIcon from "./bookmark-icon.connect";

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
        <BookmarkIcon type={type} origin={getUrlOrigin(url)} />
        <Label>{title}</Label>
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
