export default (state = {}, { payload: { origin, faviconSrc } }) => {
  return {
    ...state,
    [origin]: faviconSrc
  };
};
