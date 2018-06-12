import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers.js";

import logger from "redux-logger";

let middlewares = [];

if (process.env.NODE_ENV === `dev`) {
  middlewares.push(logger);
}

let store = createStore(combineReducers, applyMiddleware(...middlewares));

if (module.hot) {
  module.hot.accept("./reducers", () => {
    const nextCombineReducers = require("./reducers").default;
    store.replaceReducer(nextCombineReducers);
  });
}

export default store;
