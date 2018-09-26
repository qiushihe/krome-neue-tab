import uuidv4 from "uuid/v4";

export default (state = {}, {
  payload: {
    targetType,
    targetId,
    targetHtmlId,
    tooltipProps,
    contentComponent,
    contentComponentProps
  }
}) => {
  const tooltipId = uuidv4();

  return {
    ...state,
    [tooltipId]: {
      id: tooltipId,
      targetType,
      targetId,
      targetHtmlId,
      tooltipProps,
      contentComponent,
      contentComponentProps
    }
  };
};
