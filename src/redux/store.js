import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./index";

const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = configureStore({
//   reducer: { count: counterReducer },
// });

export default store;
