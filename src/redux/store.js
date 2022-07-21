import { configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./index";
import counterReducer from "./reducer/counterReducer";

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
  reducer: { count: counterReducer },
});

export default store;
