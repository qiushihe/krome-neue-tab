import thunkMiddleware from "redux-thunk";

import reduxMiddleware from './redux';
import faviconMiddleware from './favicon';

export default () => [
  thunkMiddleware,
  ...reduxMiddleware,
  ...faviconMiddleware
];
