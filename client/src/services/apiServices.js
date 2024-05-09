
import { useNavigate } from 'react-router-dom';


const baseUrl = 'http://localhost:8000/api/';

export const fetchDataWithAuth = async (endpoint) => {
    try {
        const authObject = JSON.parse(localStorage.getItem('auth'));
        const token = authObject.accessToken;

        const response = await fetch(`${baseUrl}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Unauthorized');
        }

        return await response.json();
    } catch (error) {
        if (error.message === 'Unauthorized') {
            return 401;
        } else {
            throw error;
        }
    }
};



export const postDataWithAuth = async (endpoint, data, customConfig) => {
    try {
        const authObject = JSON.parse(localStorage.getItem('auth'));


        const token = authObject.accessToken;

        const response = await axios.post(`${baseUrl}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,

            },
        });


        return response;
    } catch (error) {
        return response;
    }
};