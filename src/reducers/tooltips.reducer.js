import { handleActions } from "redux-actions";

import {
  SHOW_TOOLTIP,
  HIDE_ALL_TOOLTIP
} from '/src/actions/tooltips.action';

import showTooltip from "./tooltips/show-tooltip";
import hideAllTooltips from "./tooltips/hide-all-tooltip";

const initialState = {};

export default handleActions({
  [SHOW_TOOLTIP]: showTooltip,
  [HIDE_ALL_TOOLTIP]: hideAllTooltips
}, initialState);
