import axios from 'axios';
import * as dotenv from "dotenv";

dotenv.config();

export const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export function getAuthorized() {
    const jwtString = localStorage.getItem('token');
    http.defaults.headers = {...http.defaults.headers, "Authorization": `Bearer ${jwtString}`};
    return http;
}
