import {
    addPatientData,
    getPatientData,
    removePatientData,
    updatePatientData,
} from "../../common/api/patient.api";
import * as ActionType from "../reducer/ActionTypes";

export const fetchPatient = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingPatient());
            const res = await getPatientData();
            if (res.status === 200) {
                dispatch({ type: ActionType.FETCH_PATIENT, payload: res.data });
            }
        } catch (error) {
            dispatch(errorPatient(error.message));
        }
    };
};

export const addPatient = (data) => {
    return async (dispatch) => {
        try {
            dispatch(loadingPatient());
            const res = await addPatientData(data);
            if (res.status === 201) {
                dispatch({ type: ActionType.ADD_PATIENT, payload: data });
            }
        } catch (error) {
            dispatch(errorPatient(error.message));
        }
    };
};

export const deletePatient = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loadingPatient());
            const res = await removePatientData(id);
            if (res.status === 200) {
                dispatch({ type: ActionType.DELETE_PATIENT, payload: id });
            }
        } catch (error) {
            dispatch(errorPatient(error.message));
        }
    };
};

export const updatePatient = (data) => {
    return async (dispatch) => {
        try {
            dispatch(loadingPatient());
            const res = await updatePatientData(data);
            if (res.status === 200) {
                dispatch({ type: ActionType.UPDATE_PATIENT, payload: data });
            }
        } catch (error) {
            dispatch(errorPatient(error.message));
        }
    };
};

const loadingPatient = () => {
    return (dispatch) => {
        dispatch({ type: ActionType.LOADING_PATIENT });
    };
};

const errorPatient = (error) => {
    return (dispatch) => {
        dispatch({ type: ActionType.ERROR_PATIENT, payload: error });
    };
};
