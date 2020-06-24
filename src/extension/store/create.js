import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "/src/extension/reducers";
import createMiddleware from "/src/extension/middlewares/create";

const createStoreWithMiddleware = compose(
  applyMiddleware.apply(null, createMiddleware())
)(createStore);

export default (initialState = {}) => createStoreWithMiddleware(
  rootReducer,
  initialState
);
