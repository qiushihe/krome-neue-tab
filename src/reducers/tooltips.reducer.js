import { handleActions } from "redux-actions";

import {
  SHOW_TOOLTIP
} from '/src/actions/tooltips.action';

import showTooltip from './tooltips/show-tooltip';

const initialState = {};

export default handleActions({
  [SHOW_TOOLTIP]: showTooltip
}, initialState);
