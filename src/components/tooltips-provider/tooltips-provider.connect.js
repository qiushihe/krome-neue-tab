import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import identity from "lodash/fp/identity";
import isFunction from "lodash/fp/isFunction";

import { setAllTooltips } from "/src/actions/tooltips.action";
import { hasTooltips, tooltipIds } from "/src/selectors/tooltips.selector";

import TooltipsProvider from "./tooltips-provider";

export default connect(
  createStructuredSelector({
    tooltipIds,
    hasTooltips
  }),
  {
    setAllTooltips: ({ tooltips }) => (dispatch) => dispatch(setAllTooltips({ tooltips }))
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onBaseClick: isFunction(ownProps.onBaseClick)
      ? ownProps.onBaseClick
      : (stateProps.hasTooltips ? dispatchProps.setAllTooltips({ tooltips: [] }) : identity)
  })
)(TooltipsProvider);
