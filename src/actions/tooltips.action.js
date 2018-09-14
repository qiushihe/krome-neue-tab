import { createAction } from "redux-actions";

export const SHOW_TOOLTIP = "SHOW_TOOLTIP";
export const HIDE_TOOLTIP = "HIDE_TOOLTIP";
export const HIDE_ALL_TOOLTIP = "HIDE_ALL_TOOLTIP";

export const showTooltip = createAction(
  SHOW_TOOLTIP,
  ({
    targetBookmarkId,
    targetHtmlId,
    tooltipProps,
    contentComponent,
    contentComponentProps
  }) => ({
    targetBookmarkId,
    targetHtmlId,
    tooltipProps,
    contentComponent,
    contentComponentProps
  })
);

export const hideTooltip = createAction(
  HIDE_TOOLTIP,
  ({ targetBookmarkId }) => ({ targetBookmarkId })
);

export const hideAllTooltips = createAction(HIDE_ALL_TOOLTIP);
