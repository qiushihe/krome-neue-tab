import flow from "lodash/fp/flow";
import reduce, { convert as convertReduce } from "lodash/fp/reduce";
import first from "lodash/fp/first";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import flattenDeep from "lodash/fp/flattenDeep";

const uncappedReduce = convertReduce({ cap: false });

// Ensure the given object has no undefined attributes by turning those attributes' values into
// null.
const ensureValues = uncappedReduce((result, attrValue, attrName) => ({
  ...result,
  [attrName]: attrValue === undefined ? null : attrValue
}), {});

const parseOne = ({ section, parentId }) => ({ id, title, url, type, index, children }) => ([
  ensureValues({ section, parentId, id, title, url, type, index }),
  map(parseOne({ section, parentId: id }))(children)
]);

export default (state = {}, { payload: { source, section, bookmarks } }) => {
  return {
    ...state,
    ...flow([
      first,
      get("children"),
      map(parseOne({ section })),
      flattenDeep,
      reduce((result, entry) => ({ ...result, [entry.id]: entry }), {}) // Convert to an object.
    ])(bookmarks)
  };
};
