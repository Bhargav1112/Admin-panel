import axios from "axios";
import { BASE_URL } from "../shared/baseURL";

const medicineAxios = axios.create({
    baseURL: BASE_URL,
});

export const sendRequest = (config) => medicineAxios.request(config);

export const getDataRequest = (path) => {
    return sendRequest({
        method: "get",
        url: path,
    });
};

export const postDataRequest = (path, data) => {
    return sendRequest({
        method: "post",
        url: path,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const deleteDataRequest = (path, id) => {
    return sendRequest({
        method: "delete",
        url: path + id,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const putDataRequest = (path, data) => {
    return sendRequest({
        method: "put",
        url: path + data.id,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getRequestPatient = (path) => {
    return sendRequest({
        method: "get",
        url: path,
    });
};

export const postRequestPatient = (path, data) => {
    return sendRequest({
        method: "post",
        url: path,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const deleteRequestPatient = (path, id) => {
    return sendRequest({
        method: "delete",
        url: path + id,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const putRequestPatient = (path, data) => {
    return sendRequest({
        method: "put",
        url: path + data.id,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    });
};


