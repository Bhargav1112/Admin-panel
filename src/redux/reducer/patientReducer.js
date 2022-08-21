import * as ActionType from "./ActionTypes";

const initialState = {
    patients: [],
    isLoading: false,
    error: "",
};

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_PATIENT:
            return {
                ...state,
                isLoading: false,
                patients: action.payload,
                error: "",
            };

        case ActionType.ADD_PATIENT:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.concat(action.payload),
            };

        case ActionType.DELETE_PATIENT:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.filter(
                    (patient) => patient.id !== action.payload
                ),
            };

        case ActionType.UPDATE_PATIENT:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.map((patient) =>
                    patient.id === action.payload.id ? action.payload : patient
                ),
            };

        case ActionType.LOADING_PATIENT:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case ActionType.ERROR_PATIENT:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default patientReducer;
