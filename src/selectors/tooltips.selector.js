import { createSelector } from "reselect";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import values from "lodash/fp/values";
import map from "lodash/fp/map";

import { getProp } from "/src/helpers/selector.helpers";

import { tooltips as getAllTooltips } from "./root.selector";

export const tooltips = createSelector(
  getAllTooltips,
  values
);

export const tooltipIds = createSelector(
  tooltips,
  map("id")
);

export const tooltip = createSelector(
  getProp("tooltipId"),
  getAllTooltips,
  (tooltipId, allTooltips) => {
    return get(tooltipId)(allTooltips);
  }
);

export const targetHtmlId = createSelector(
  tooltip,
  get("targetHtmlId")
);

export const contentComponent = createSelector(
  tooltip,
  get("contentComponent")
);

export const contentComponentProps = createSelector(
  tooltip,
  getOr({}, "contentComponentProps")
);
