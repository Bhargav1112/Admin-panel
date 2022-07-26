import { FETCH_MEDICINE } from "../reducer/ActionTypes";

export const fetchMedicine = () => {
  return (dispatch) => {
    dispatch({ type: "loading", payload: true });

    fetch("http://localhost:3004/medicines")
      .then((res) => res.json())
      .then((data) => dispatch({ type: FETCH_MEDICINE, payload: data }))
      .catch((error) => console.log(error));
  };
};
