import { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FOLDER } from "/src/extension/enums/bookmark-types";
import fileIcon from "/src/extension/images/icon-file.png";
import folderIcon from "/src/extension/images/icon-folder.png";

const Base = styled.div`
  padding-right: 8px;
  pointer-events: none;
`;

class BookmarkIcon extends PureComponent {
  render() {
    const { type, faviconSrc } = this.props;

    let imageSrc = type === FOLDER ? folderIcon : fileIcon;
    if (!!faviconSrc) {
      imageSrc = faviconSrc;
    }

    return (
      <Base>
        <img src={imageSrc} width={16} height={16} />
      </Base>
    );
  }
}

BookmarkIcon.propTypes = {
  type: PropTypes.string,
  faviconSrc: PropTypes.string,
};

BookmarkIcon.defaultProps = {
  type: "",
  faviconSrc: "",
};

export default BookmarkIcon;
