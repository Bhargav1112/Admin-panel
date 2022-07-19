import { combineReducers } from "redux";
import counterReducer from "./reducer/counterReducer";

const rootReducer = combineReducers({
  count: counterReducer,
});
export default rootReducer;
