import * as request from "../lib/request";

const baseUrl = 'http://localhost:8000/api'

export const getAll = async () => {

    const result = await request.get(`${baseUrl}/categories`);

    // const data = Object.values(result);

    return result;
};



export const update = async (id,formData) => {
    const result = await request.put(`${baseUrl}/updateCategory/${id}`,formData);

    const data = Object.values(result);

    return data;
};

export const create = async (formData) => {
    const result = await request.post(`${baseUrl}/createCategory`,formData);

    const data = (result);

    return data;
};

