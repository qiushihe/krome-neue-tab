import { createAction } from "redux-actions";

export const SET_ALL_TOOLTIP = "SET_ALL_TOOLTIP";

export const setAllTooltips = createAction(
  SET_ALL_TOOLTIP,
  ({ tooltips }) => ({ tooltips })
);
