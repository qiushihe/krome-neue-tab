import get from "lodash/fp/get";

export const getProp = (propName) => (_, props) => get(propName)(props);

export const withExtraProps = (selector, extras) => (state, props) => {
  return selector(state, { ...props, ...extras });
};
