import * as request from '../lib/request';


const baseUrl = 'http://localhost:8000/api';

export const login = async (username, password) => {

    const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });
    const data = await response.json();

   
    if (response.ok && data.status != 'error') {
        return data;


    } else {
        return data;
        console.error("Login failed", data.message);
    }

    };
    //     console.log('enter here');
    //     const result = await request.post(`${baseUrl}/login`, {
    //         username,
    //         password,
    //     });

    //     return result;
    // };

    export const register = (username, password) => request.post(`${baseUrl}/register`, {
        username,
        password,
    });

    export const logout = () => request.get(`${baseUrl}/logout`);
