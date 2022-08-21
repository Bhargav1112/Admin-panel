import {
    deleteDataRequest,
    getDataRequest,
    postDataRequest,
    putDataRequest,
} from "../request";
import { URLS } from "./URLS";

export const medicineGetData = () => getDataRequest(URLS.medicine);

export const medicineAddData = (data) => postDataRequest(URLS.medicine, data);

export const medicineDeleteData = (id) =>
    deleteDataRequest(`${URLS.medicine}/`, id);

export const medicineUpdateData = (data) =>
    putDataRequest(`${URLS.medicine}/`, data);
