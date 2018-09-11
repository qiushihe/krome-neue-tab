import flow from "lodash/fp/flow";
import first from "lodash/fp/first";
import get from "lodash/fp/get";

export default (state = {}, { payload: { section, bookmarksTree } }) => {
  const entries = flow([
    first,
    get("children")
  ])(bookmarksTree);

  return {
    ...state,
    [section]: entries
  };
};
