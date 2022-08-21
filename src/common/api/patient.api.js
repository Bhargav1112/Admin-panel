import {
    deleteRequestPatient,
    getRequestPatient,
    postRequestPatient,
    putRequestPatient,
} from "../request";
import { URLS } from "./URLS";

export const getPatientData = () => getRequestPatient(URLS.patient);

export const addPatientData = (data) => postRequestPatient(URLS.patient, data);

export const updatePatientData = (data) =>
    putRequestPatient(`${URLS.patient}/`, data);

export const removePatientData = (id) =>
    deleteRequestPatient(`${URLS.patient}/`, id);
