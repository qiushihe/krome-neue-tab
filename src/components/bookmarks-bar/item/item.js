import { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import get from "lodash/fp/get";

import fileIcon from "/src/images/icon-file.png";
import folderIcon from "/src/images/icon-folder.png";

const Base = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 9999px;
  margin: 0 2px;
  padding: 6px 8px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #eeeeee;
  }

  &:active {
    background-color: #e2e2e2;
  }
`;

const WithIcon = styled.div`
  background-image: url(${get("iconUrl")});
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 20px;
`;

class Item extends PureComponent {
  render() {
    const {
      title,
      isFolder,
      onClick
    } = this.props;

    return (
      <Base onClick={onClick}>
        <WithIcon iconUrl={isFolder ? folderIcon : fileIcon}>
          {title}
        </WithIcon>
      </Base>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string,
  isFolder: PropTypes.bool,
  onClick: PropTypes.func
};

Item.defaultProps = {
  title: "",
  isFolder: false,
  onClick: () => {}
};

export default Item;
