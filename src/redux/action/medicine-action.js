import { BASE_URL } from "../../shared/baseURL";
import {
    ADD_MEDICINE,
    DELETE_MEDICINE,
    ERROR_MED,
    FETCH_MEDICINE,
    LOADING_MED,
    UPDATE_MEDICINE,
} from "../reducer/ActionTypes";

export const fetchMedicine = () => {
    return (dispatch) => {
        dispatch(loadingMedicine());

        setTimeout(() => {
            fetch(BASE_URL + "medicines")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(
                            `Something went wrong : ${res.status} : ${res.statusText}`
                        );
                    }
                    return res.json();
                })
                .then((data) =>
                    dispatch({ type: FETCH_MEDICINE, payload: data })
                )
                .catch((error) => dispatch(errorMedicine(error.message)));
        }, 2000);
    };
};

export const addMedicine = (medicine) => {
    return async (dispatch) => {
        try {
            const res = await fetch(BASE_URL + "medicines", {
                method: "POST",
                body: JSON.stringify(medicine),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(
                    `Something went wrong : ${res.status} : ${res.statusText}`
                );
            }
            dispatch({ type: ADD_MEDICINE, payload: medicine });
        } catch (err) {
            dispatch(errorMedicine(err.message));
        }
    };
};

export const deleteMedicine = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "medicines/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("res:", response);
            console.log("id:", id);

            if (!response.ok) {
                throw new Error(
                    `Something went wrong : ${response.status} : ${response.statusText}`
                );
            }

            dispatch({ type: DELETE_MEDICINE, payload: id });
        } catch (error) {
            dispatch(errorMedicine(error.message));
        }
    };
};

export const updateMedicine = (medicine) => {
    return async (dispatch) => {
        console.log(medicine);
        try {
            const res = await fetch(BASE_URL + "medicines/" + medicine.id, {
                method: "PUT",
                body: JSON.stringify(medicine),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(
                    `Something went wrong : ${res.status} : ${res.statusText}`
                );
            }

            dispatch({ type: UPDATE_MEDICINE, payload: medicine });
        } catch (err) {
            dispatch(errorMedicine(err.message));
        }
    };
};

const loadingMedicine = () => {
    return (dispatch) => {
        dispatch({ type: LOADING_MED });
    };
};
const errorMedicine = (error) => {
    return (dispatch) => {
        dispatch({ type: ERROR_MED, payload: error });
    };
};
