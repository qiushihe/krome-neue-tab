import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import find from "lodash/fp/find";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import values from "lodash/fp/values";
import sortBy from "lodash/fp/sortBy";
import map from "lodash/fp/map";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";

import { BOOKMARK } from "/src/extension/enums/tooltip-target-types";
import { getProp } from "/src/extension/selectors/selector.helper";

import { tooltips as getAllTooltips } from "./root.selector";

export const tooltips = createSelector(
  getAllTooltips,
  values,
  sortBy("index")
);

export const tooltipIds = createSelector(
  tooltips,
  map("id")
);

export const hasTooltips = createSelector(
  tooltips,
  negate(isEmpty)
);

export const hasTooltipForBookmarkId = createSelector(
  getProp("bookmarkId"),
  tooltips,
  (bookmarkId, _tooltips) => flow([
    find({ targetType: BOOKMARK, targetId: bookmarkId }),
    negate(isEmpty)
  ])(_tooltips)
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

export const tooltipProps = createSelector(
  tooltip,
  getOr({}, "tooltipProps")
);

export const contentComponent = createSelector(
  tooltip,
  get("contentComponent")
);

export const contentComponentProps = createSelector(
  tooltip,
  getOr({}, "contentComponentProps")
);
