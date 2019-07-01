import { handleActions } from "redux-actions";

import {
  CLICK_BASE
} from "/src/actions/bookmark-tooltips.action";

import clickBase from "./bookmark-tooltips/click-base";

const initialState = {};

export default handleActions({
  [CLICK_BASE]: clickBase
}, initialState);
