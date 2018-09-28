import reduce from "lodash/fp/reduce";
import uuidv4 from "uuid/v4";

export default (state = {}, { payload: { tooltips } }) => {
  return reduce((result, {
    index,
    tooltipId,
    targetType,
    targetId,
    targetHtmlId,
    tooltipProps,
    contentComponent,
    contentComponentProps
  }) => {
    if (state[tooltipId]) {
      return {
        ...result,
        [tooltipId]: state[tooltipId]
      };
    } else {
      const id = uuidv4();

      return {
        ...result,
        [id]: {
          index,
          id,
          targetType,
          targetId,
          targetHtmlId,
          tooltipProps,
          contentComponent,
          contentComponentProps
        }
      };
    }
  }, {})(tooltips);
};
