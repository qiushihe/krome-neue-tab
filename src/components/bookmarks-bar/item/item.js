import { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

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

class Item extends PureComponent {
  render() {
    const { title, onClick } = this.props;

    return (
      <Base onClick={onClick}>
        {title}
      </Base>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func
};

Item.defaultProps = {
  title: "",
  onClick: () => {}
};

export default Item;
