import * as request from "../lib/request";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
};



const baseUrl = 'http://localhost:8000/api'

export const getAll = async () => {

    try {
        const response = await fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers:headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const data = Object.values(result);

        return data;

    } catch (error) {
        console.error('Error fetching files:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
};








export const del = async (id) => {
    const result = await request.remove(`${baseUrl}/${id}`);

    const data = Object.values(result);

    return data;
};

export const update = async (id,formData) => {
    const result = await request.put(`${baseUrl}/updateUser/${id}`,formData, {
        method: 'GET',
        headers: headers,
    });

    const data = Object.values(result);

    return data;
};

export const create = async (formData) => {
    const result = await request.post(`${baseUrl}/createUser`,formData, {
        method: 'GET',
        headers:headers,
    });

    const data = (result);

    return data;
};

