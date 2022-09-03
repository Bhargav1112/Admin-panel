import { combineReducers } from "redux";
import counterReducer from "./reducer/counterReducer";
import doctorReducer from "./reducer/doctorReducer";
import medicineReducer from "./reducer/medicineReducer";
import patientReducer from "./reducer/patientReducer";

const rootReducer = combineReducers({
    count: counterReducer,
    medicine: medicineReducer,
    patient: patientReducer,
    doctor: doctorReducer
});
export default rootReducer;
