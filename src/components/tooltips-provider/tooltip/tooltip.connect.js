import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  targetHtmlId,
  contentComponent,
  contentComponentProps
} from "/src/selectors/tooltips.selector";

import Tooltip from "./tooltip";

export default connect(
  createStructuredSelector({
    targetHtmlId,
    contentComponent,
    contentComponentProps
  })
)(Tooltip);
