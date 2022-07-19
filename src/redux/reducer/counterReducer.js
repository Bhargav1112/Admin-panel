import * as ActionType from "./ActionTypes";

const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { counter: state.counter + 1 };
      break;
    case ActionType.DECREMENT:
      return { counter: state.counter - 1 };
      break;
    default:
      return state;
  }
};

export default counterReducer;
