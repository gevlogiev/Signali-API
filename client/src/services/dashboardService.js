import * as request from "../lib/request";

const baseUrl = 'http://localhost:8000/api'

export const getAll = async () => {

    const result = await request.get(`${baseUrl}/dashboardData`);



    return result;
};

export const del = async (id) => {
    const result = await request.remove(`${baseUrl}/${id}`);

    const data = Object.values(result);

    return data;
};

export const update = async (id, formData) => {
    const result = await request.put(`${baseUrl}/updateGroup/${id}`, formData);

    const data = Object.values(result);

    return data;
};

export const create = async (formData) => {
    const result = await request.post(`${baseUrl}/createGroup`, formData);

    const data = (result);

    return data;
};

