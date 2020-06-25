import get from 'lodash/fp/get';

export const getUrlOrigin = urlString => {
  try {
    return (new URL(urlString)).origin;
  } catch {
    return null;
  }
};

export const getKeyOrigin = key => {
  return get(1)(`${key}`.trim().match(/favicon:(.+)$/));
};
