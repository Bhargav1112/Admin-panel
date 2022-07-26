import { combineReducers } from "redux";
import counterReducer from "./reducer/counterReducer";
import medicineReducer from "./reducer/medicineReducer";

const rootReducer = combineReducers({
  count: counterReducer,
  medicine: medicineReducer,
});
export default rootReducer;
