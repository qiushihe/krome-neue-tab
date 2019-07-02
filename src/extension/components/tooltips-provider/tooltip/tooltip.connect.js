import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  targetHtmlId,
  tooltipProps,
  contentComponent,
  contentComponentProps
} from "/src/extension/selectors/tooltips.selector";

import Tooltip from "./tooltip";

export default connect(
  createStructuredSelector({
    targetHtmlId,
    tooltipProps,
    contentComponent,
    contentComponentProps
  })
)(Tooltip);
