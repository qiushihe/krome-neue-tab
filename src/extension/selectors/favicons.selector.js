import { createSelector } from "reselect";
import get from "lodash/fp/get";

import { getProp } from "/src/extension/selectors/selector.helper";

import { favicons as faviconsState } from "./root.selector";

export const faviconSrc = createSelector(
  getProp("origin"),
  faviconsState,
  (origin, favicons) => get(origin)(favicons)
);
