import * as ActionType from "./ActionTypes";

const initialState = {
    isLoading: false,
    medicines: [],
    error: null,
};

const medicineReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_MEDICINE:
            return {
                ...state,
                medicines: action.payload,
                isLoading: false,
                error: null,
            };
        case ActionType.DELETE_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.filter(
                    (item) => item.id !== action.payload
                ),
                isLoading: false,
                error: "",
            };
        case ActionType.LOADING_MED:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case ActionType.ERROR_MED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default medicineReducer;
