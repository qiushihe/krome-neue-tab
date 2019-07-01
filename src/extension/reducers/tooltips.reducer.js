import { handleActions } from "redux-actions";

import { SET_ALL_TOOLTIP } from "/src/actions/tooltips.action";

import setAllTooltips from "./tooltips/set-all-tooltip";

const initialState = {};

export default handleActions({
  [SET_ALL_TOOLTIP]: setAllTooltips
}, initialState);
