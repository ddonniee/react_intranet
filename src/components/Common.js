import axios from 'axios';

/** axios instance */
export const axiosInstance = axios.create({
    baseURL: 'https://www.ag-grid.com',
    headers: {
        // 'Authorization': 'Bearer ' + localStorage.getItem('Token'),
        'Content-Type': 'multipart/form-data'
    }
});

export const axiosJsonInstance = axios.create({
    baseURL: 'https://www.ag-grid.com',
    headers: {
        // 'Authorization': 'Bearer ' + localStorage.getItem('Token'),
        'Content-Type': 'application/json; charset=utf-8'
    }
});
