import thunkMiddleware from "redux-thunk";

import faviconMiddleware from './redux';

export default () => [
  thunkMiddleware,
  ...faviconMiddleware
];
