import {
    deleteDataRequest,
    getDataRequest,
    postDataRequest,
    putDataRequest,
} from "../request";

export const medicineGetData = () => getDataRequest("medicines");

export const medicineAddData = (data) => postDataRequest("medicines", data);

export const medicineDeleteData = (id) => deleteDataRequest("medicines/", id);

export const medicineUpdateData = (data) => putDataRequest("medicines/", data);
