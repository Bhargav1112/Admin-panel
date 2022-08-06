import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/action/counterAction";
// import * as ActionType from "../redux/reducer/ActionTypes";

function Counter(props) {
    const count = useSelector((state) => state.count.counter);
    const dispatch = useDispatch();
    const incrementHandler = () => {
        // dispatch({ type: ActionType.INREMENT });
        dispatch(increment());
    };
    const decrementHandler = () => {
        // dispatch({ type: ActionType.DECREMENT });
        dispatch(decrement());
    };
    return (
        <div>
            <button onClick={incrementHandler}>+</button>
            {count}
            <button onClick={decrementHandler}>-</button>
        </div>
    );
}

export default Counter;
