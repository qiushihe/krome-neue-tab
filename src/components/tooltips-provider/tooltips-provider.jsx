import { PureComponent, Children } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import flattenDeep from "lodash/fp/flattenDeep";

import Tooltip from "./tooltip";

const Base = styled.div`
  display: block;
  position: relative;
  height: 100%;
`;

class TooltipsProvider extends PureComponent {
  render() {
    const { tooltipIds, onBaseClick, children } = this.props;

    return (
      <Base onClick={onBaseClick}>
        {Children.toArray(flattenDeep([children]))}
        {flow([
          map((tooltipId) => (
            <Tooltip tooltipId={tooltipId} />
          )),
          Children.toArray
        ])(tooltipIds)}
      </Base>
    );
  }
}

TooltipsProvider.propTypes = {
  tooltipIds: PropTypes.array,
  onBaseClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

TooltipsProvider.defaultProps = {
  tooltipIds: [],
  onBaseClick: () => {},
  children: []
};

export default TooltipsProvider;
