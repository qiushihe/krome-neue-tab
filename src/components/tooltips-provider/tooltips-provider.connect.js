import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { tooltipIds } from "/src/selectors/tooltips.selector";

import TooltipsProvider from "./tooltips-provider";

export default connect(
  createStructuredSelector({
    tooltipIds
  })
)(TooltipsProvider);
