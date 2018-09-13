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
    const { tooltipIds, children } = this.props;

    console.log("tooltipIds", tooltipIds);

    return (
      <Base>
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

TooltipsProvider.defaultProps = {
  tooltipIds: [],
  children: []
};

export default TooltipsProvider;
