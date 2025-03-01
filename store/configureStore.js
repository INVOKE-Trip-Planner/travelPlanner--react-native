import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
 import AsyncStorage from "@react-native-community/async-storage";
import createSagaMiddleware from "redux-saga";

import reducers from "../reducers/index";
import sagas from "../sagas/index";

let store, middlewares;
const sagaMiddleware = createSagaMiddleware();

const config = {
  key: "root",
  storage: AsyncStorage,
  // storage,
  whitelist: ["PROFILE", "TRIP"] // keep the token in the profile activeuser session
};

const reducer = persistCombineReducers(config, reducers);

/* global __DEV__ */
// if (__DEV__) {
//   const excludedActions = [];
//   const logger = createLogger({
//     collapsed: true,
//     predicate: (getState, action) => excludedActions.indexOf(action.type) < 0
//   });
//   middlewares = applyMiddleware(sagaMiddleware, logger);
// } else {
//   middlewares = applyMiddleware(sagaMiddleware);
// }

middlewares = applyMiddleware(sagaMiddleware);

export const getStore = () => store;

const configureStore = () => {
  store = createStore(reducer, middlewares);
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;
