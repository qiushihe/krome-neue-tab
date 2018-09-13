import { createAction } from "redux-actions";

export const SHOW_TOOLTIP = "SHOW_TOOLTIP";
export const HIDE_ALL_TOOLTIP = "HIDE_ALL_TOOLTIP";

export const showTooltip = createAction(
  SHOW_TOOLTIP,
  ({
    targetHtmlId,
    tooltipProps,
    contentComponent,
    contentComponentProps
  }) => ({
    targetHtmlId,
    tooltipProps,
    contentComponent,
    contentComponentProps
  })
);

export const hideAllTooltips = createAction(HIDE_ALL_TOOLTIP);
