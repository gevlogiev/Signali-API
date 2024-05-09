import * as request from "../lib/request";



const baseUrl = 'http://127.0.0.1:8000/api'

const serializeFilterData = (filterData) => {
    // Serialize filterData object into query string format
    return Object.keys(filterData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filterData[key])}`)
        .join('&');
};



export const getAll = async (pageSize, pageNumber,filterData) => {
    let url = `${baseUrl}/signals?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    
    if (filterData) {
        const filterQueryString = serializeFilterData(filterData); // Implement serializeFilterData function
        url += `&${filterQueryString}`;
    }


    const result = await request.get(`${url}`);



    return result;
}



export const externalSignalCreate = async (formData) => {


    const response = await fetch(`${baseUrl}/externalSignalCreate`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result;
};


export const updateSignal = async (dataToUpdate) => {


    try {
        const response = await request.post(`${baseUrl}/updateSignal`,dataToUpdate);

       
        const result = await response;
   
        return result;
    } catch (error) {
        console.error(error);
    }




};

export const getFiles = async (signalId) => {
    try {
        const response = await fetch(`${baseUrl}/getFiles/${signalId}`, {
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


export const getRedirects = async (signalId) => {
    try {
        const response = await fetch(`${baseUrl}/getRedirects/${signalId}`, {
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


export const updateSignalCount = async (signalId) => {

    try {
        const response = await request.post(`${baseUrl}/updateSignalCount?signalId=${signalId}`);
        
   
        return response;
    } catch (error) {
        console.error(error);
    }




};


export const getById = async (signalId) => {
    let url = `${baseUrl}/signal/${signalId}`;
    
  
    const result = await request.get(`${url}`);



    return result;
}


