import { createAction } from "redux-actions";

export const SHOW_TOOLTIP = "SHOW_TOOLTIP";

export const showTooltip = createAction(
  SHOW_TOOLTIP,
  ({
    targetHtmlId,
    contentComponent,
    contentComponentProps
  }) => ({
    targetHtmlId,
    contentComponent,
    contentComponentProps
  })
);
