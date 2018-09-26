import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import identity from "lodash/fp/identity";
import isFunction from "lodash/fp/isFunction";

import { hideAllTooltips } from "/src/actions/tooltips.action";
import { hasTooltips, tooltipIds } from "/src/selectors/tooltips.selector";

import TooltipsProvider from "./tooltips-provider";

export default connect(
  createStructuredSelector({
    tooltipIds,
    hasTooltips
  }),
  {
    hideAllTooltips: () => (dispatch) => dispatch(hideAllTooltips())
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onBaseClick: isFunction(ownProps.onBaseClick)
      ? ownProps.onBaseClick
      : (stateProps.hasTooltips ? dispatchProps.hideAllTooltips : identity)
  })
)(TooltipsProvider);
