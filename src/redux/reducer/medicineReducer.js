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
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default medicineReducer;
