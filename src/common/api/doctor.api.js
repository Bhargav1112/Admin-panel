import {sendRequest} from '../request'

export const getRequestDoc = path => sendRequest({
    method: 'get',
    url: path
})

export const postRequestDoc = (path,data) => sendRequest({
    method: 'post',
    url: path,
    headers: {
        "Content-Type": "application/json",
    },
    data: JSON.stringify(data)
})

export const putRequestDoc = (path, data) => sendRequest({
    method: 'put',
    url: path + data.id,
    headers: {
        "Content-Type": "application/json",
    },
    data: JSON.stringify(data)
})

export const deleteRequestDoc = (path, id) => sendRequest({
    method: 'delete',
    url: path + id,
    headers: {
        "Content-Type": "application/json",
    },
})