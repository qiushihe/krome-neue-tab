import { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {getUrlOrigin} from "/src/helpers/urls.helper";

import BookmarkIcon from "./bookmark-icon.connect";

const Base = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 6px 18px 6px 24px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #e8eaed;
  }
`;

const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
  pointer-events: none;
`;

class BookmarksTooltipItem extends PureComponent {
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
        id={`bookmarks-tooltip-item-${id}`}
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

BookmarksTooltipItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

BookmarksTooltipItem.defaultProps = {
  id: "",
  title: "",
  type: "",
  url: "",
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export default BookmarksTooltipItem;
