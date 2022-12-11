import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import counterSlice from "./counterSlice";
import { productsApi } from "./productsApi";
import { addressApi } from "./addressApi";

import cartReducer, { getTotals } from "./cartSlice";
import authReducer from "./authSlice";
import productsReducer, { productsFetch } from "./productsSlice";
// import globalSlice from "./globalSlice";
// import createSagaMiddleware from "@redux-saga/core";

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  user: authReducer,
  counter: counterSlice,
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,

  cart: cartReducer,

  // global: globalSlice,
});
// My custom middleware to logger store state
// const loggerMiddleware = (store) => (next) => (action) => {
//   // your code here
//   console.log(action);
//   action.payload = 10;
//   next(action);
// };
// redux-logger
// const loggerMiddleware = function (store) {
//   return function (next) {
//     return function (action) {
//       // your code here
//     };
//   };
// };
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      addressApi.middleware
    ),

  // middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});
// store.subscribe(() => {
//   //  javascript observer pattern
//   console.log(`current state: ${store.getState().counter.count}`);
// });
// store.dispatch(incrementByValue(1));
// store.dispatch(incrementByValue(3));
// store.dispatch(incrementByValue(5));
// sagaMiddleware.run(rootSaga);
// store.dispatch(productsFetch());

export default store;
