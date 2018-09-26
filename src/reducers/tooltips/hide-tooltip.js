import flow from "lodash/fp/flow";
import values from "lodash/fp/values";
import find from "lodash/fp/find";
import get from "lodash/fp/get";
import cloneDeep from "lodash/fp/cloneDeep";

export default (state = {}, { payload: { targetType, targetId } }) => {
  const newState = cloneDeep(state);

  const tooltipId = flow([
    values,
    find({ targetType, targetId }),
    get("id")
  ])(newState);

  delete newState[tooltipId];

  return newState;
};
