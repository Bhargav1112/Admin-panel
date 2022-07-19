import { DECREMENT, INCREMENT } from "../reducer/ActionTypes";

export const increment = () => {
  return (dispatch) => {
    dispatch({ type: INCREMENT });
  };
};
export const decrement = () => {
  return (dispatch) => {
    dispatch({ type: DECREMENT });
  };
};
