import uuidv4 from "uuid/v4";

export default (state = {}, {
  payload: {
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
      targetHtmlId,
      tooltipProps,
      contentComponent,
      contentComponentProps
    }
  };
};
